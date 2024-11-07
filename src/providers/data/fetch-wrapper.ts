import { GraphQLFormattedError } from 'graphql';
import { useGlobalStore } from '../context/store';

type Error = {
  message: string;
  statusCode: string;
};

const customFetch = async (url: string, options: RequestInit) => {
  const { user } = useGlobalStore.getState();
  const headers = options.headers as Record<string, string>;

  return await fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: `Bearer ${user?.accessToken}`,
      'Content-Type': 'application/json',
      'Apollo-Require-Preflight': 'true',
    },
    credentials: 'include',
  });
};

const getGraphQLErrors = (
  body: Record<'errors', GraphQLFormattedError[] | undefined>,
): Error | null => {
  if (!body) {
    return {
      message: 'Unknown error',
      statusCode: 'INTERNAL_SERVER_ERROR',
    };
  }

  if ('errors' in body) {
    const errors = body?.errors;

    let messages = errors?.map((error) => error?.message)?.join('');
    const code = errors?.[0]?.extensions?.code;

    if (messages?.includes('violates foreign key constraint')) {
      messages = "Can't delete this record because relation exists";
    }

    return {
      message: messages || JSON.stringify(errors),
      statusCode: code || 500,
    };
  }

  return null;
};

export const fetchWrapper = async (url: string, options: RequestInit) => {
  const response = await customFetch(url, options);

  const responseClone = response.clone();
  const body = await responseClone.json();

  const error = getGraphQLErrors(body);

  if (error) {
    throw error;
  }

  return response;
};
