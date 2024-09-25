import graphqlDataProvider, { GraphQLClient } from '@refinedev/nestjs-query';
import * as builder from 'gql-query-builder';
import { fetchWrapper } from './fetch-wrapper';
import {
  BaseRecord,
  CrudFilter,
  CrudOperators,
  CrudSorting,
  DataProvider,
  LogicalFilter,
  Pagination,
} from '@refinedev/core';
import { singular } from 'pluralize';
import camelcase from 'camelcase';
import VariableOptions from 'gql-query-builder/build/VariableOptions';
import set from 'lodash/set';

export const BASE_API_URL =
  import.meta.env.VITE_ENVIRONMENT == 'dev'
    ? import.meta.env.VITE_LOCAL_BASE_API_URL
    : import.meta.env.VITE_BASE_API_URL;

export const client = new GraphQLClient(`${BASE_API_URL}graphql`, {
  fetch: (url: string, options: RequestInit) => {
    try {
      return fetchWrapper(url, options);
    } catch (error) {
      return Promise.reject(error as Error);
    }
  },
});

const operatorMap: { [key: string]: string } = {
  eq: 'eq',
  ne: 'neq',
  lt: 'lt',
  gt: 'gt',
  lte: 'lte',
  gte: 'gte',
  in: 'in',
  nin: 'notIn',
};

const operatorMapper = (
  operator: CrudOperators,
  value: any,
): { [key: string]: any } => {
  if (operator === 'contains') {
    return { iLike: `%${value}%` };
  }

  if (operator === 'ncontains') {
    return { notILike: `%${value}%` };
  }

  if (operator === 'startswith') {
    return { iLike: `${value}%` };
  }

  if (operator === 'nstartswith') {
    return { notILike: `${value}%` };
  }

  if (operator === 'endswith') {
    return { iLike: `%${value}` };
  }

  if (operator === 'nendswith') {
    return { notILike: `%${value}` };
  }

  if (operator === 'null') {
    return { is: null };
  }

  if (operator === 'nnull') {
    return { isNot: null };
  }

  if (operator === 'between') {
    if (!Array.isArray(value)) {
      throw new Error('Between operator requires an array');
    }

    if (value.length !== 2) {
      return {};
    }

    return { between: { lower: value[0], upper: value[1] } };
  }

  return { [operatorMap[operator]]: value };
};

const generateFilters = (filters: LogicalFilter[]) => {
  const result: { [key: string]: { [key: string]: string | number } } = {};

  filters
    .filter((f) => {
      if (Array.isArray(f.value) && f.value.length === 0) {
        return false;
      }

      return !!f.value;
    })
    .map((filter: LogicalFilter | CrudFilter) => {
      if (filter.operator === 'and' || filter.operator === 'or') {
        return set(result, filter.operator, [
          generateFilters(filter.value as LogicalFilter[]),
        ]);
      } else if ('field' in filter) {
        return set(
          result,
          filter.field,
          operatorMapper(filter.operator, filter.value),
        );
      } else {
        return {};
      }
    });

  return result;
};

const generateSorting = (sorters: CrudSorting) => {
  return sorters.map((sorter) => {
    return {
      field: sorter.field,
      direction: sorter.order.toUpperCase(),
    };
  });
};

const generatePaging = (pagination: Pagination) => {
  // maximum value of 32 bit signed integer
  if (pagination.mode === 'off') return { limit: 2147483647 };

  if (pagination.mode !== 'server') return undefined;

  if (!pagination.current || !pagination.pageSize) return undefined;

  return {
    limit: pagination.pageSize,
    offset: (pagination.current - 1) * pagination.pageSize,
  };
};

export const defaultDataProvider = graphqlDataProvider(client);

export const dataProvider: DataProvider = {
  ...defaultDataProvider,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    if (meta?.empty) {
      return { data: [] };
    }
    const operation = camelcase(resource);

    const paging = generatePaging(pagination || {});

    const queryVariables: VariableOptions = {};

    let query;
    let variables;

    if (meta?.gqlQuery) {
      query = meta?.gqlQuery;

      variables = {
        filter: filters ? generateFilters(filters as LogicalFilter[]) : {},
        sorting: sorters ? generateSorting(sorters) : [],
        paging,
        meta: JSON.stringify(meta),
      };
    } else {
      if (filters) {
        queryVariables['filter'] = {
          type: camelcase(`${singular(resource)}Filter`, {
            pascalCase: true,
          }),
          required: true,
          value: generateFilters(filters as LogicalFilter[]),
        };
      }

      if (sorters) {
        queryVariables['sorting'] = {
          type: camelcase(`${singular(resource)}Sort`, {
            pascalCase: true,
          }),
          required: true,
          list: [true],
          value: generateSorting(sorters),
        };
      }

      if (paging) {
        queryVariables['paging'] = {
          type: 'OffsetPaging',
          required: true,
          value: paging,
        };
      }

      const gqlQuery = builder.query({
        operation,
        fields: [{ nodes: meta?.fields }, 'totalCount'],
        variables: queryVariables,
      });

      query = gqlQuery.query;
      variables = gqlQuery.variables;
    }

    const response = await client.request<BaseRecord>(query, variables);

    return {
      data: response[operation].nodes,
      total: response[operation].totalCount,
    };
  },
  create: async ({ resource, variables, meta }) => {
    const operation = `createOne${camelcase(singular(resource), {
      pascalCase: true,
    })}`;

    const gqlOperation = meta?.gqlMutation ?? meta?.gqlQuery;

    if (gqlOperation) {
      let response: BaseRecord;
      if (meta?.customType) {
        response = await client.request<BaseRecord>(gqlOperation, {
          input: variables,
        });
      } else {
        response = await client.request<BaseRecord>(gqlOperation, {
          input: { [camelcase(singular(resource))]: variables },
        });
      }

      return {
        data: response[operation],
      };
    }

    const { query, variables: queryVariables } = builder.mutation({
      operation,
      fields: meta?.fields || ['id'],
      variables: {
        input: {
          type: `CreateOne${camelcase(singular(resource), {
            pascalCase: true,
          })}Input`,
          required: true,
          value: {
            [camelcase(singular(resource))]: variables,
          },
        },
      },
    });

    const response = await client.request<BaseRecord>(query, queryVariables);

    return {
      data: response[operation],
    };
  },
  update: async ({ resource, id, variables, meta }) => {
    const operation = `updateOne${camelcase(singular(resource), {
      pascalCase: true,
    })}`;

    const gqlOperation = meta?.gqlMutation ?? meta?.gqlQuery;

    if (gqlOperation) {
      let response: BaseRecord;
      if (meta?.customType) {
        response = await client.request<BaseRecord>(gqlOperation, {
          input: { id, ...variables },
        });
      } else {
        response = await client.request<BaseRecord>(gqlOperation, {
          input: {
            id,
            update: variables,
          },
        });
      }
      return {
        data: response[operation],
      };
    }

    const { query, variables: queryVariables } = builder.mutation({
      operation,
      fields: meta?.fields || ['id'],
      variables: {
        input: {
          type: `UpdateOne${camelcase(singular(resource), {
            pascalCase: true,
          })}Input`,
          required: true,
          value: {
            id,
            update: variables,
          },
        },
      },
    });

    const response = await client.request<BaseRecord>(query, queryVariables);

    return {
      data: response[operation],
    };
  },
  custom: async ({ url, method, headers, meta }) => {
    if (meta?.empty) {
      return { data: null };
    }

    if (url) {
      client.setEndpoint(url);
    }

    if (headers) {
      client.setHeaders(headers);
    }

    const gqlOperation = meta?.gqlMutation ?? meta?.gqlQuery;

    if (gqlOperation) {
      const response: any = await client.request(
        gqlOperation,
        {
          ...meta?.variables,
          meta: meta ? meta.meta : undefined,
        } ?? {},
      );

      return { data: response };
    }

    if (meta?.rawQuery) {
      const response = await client.request<BaseRecord>(
        meta.rawQuery,
        meta.variables,
      );

      return { data: response };
    }

    if (meta) {
      if (meta.operation) {
        let query, variables;

        if (method === 'get') {
          const gqlQuery = builder.query({
            operation: meta.operation,
            fields: meta.fields,
            variables: meta.variables,
          });

          query = gqlQuery.query;
          variables = gqlQuery.variables;
        } else {
          const gqlMutation = builder.mutation({
            operation: meta.operation,
            fields: meta.fields,
            variables: meta.variables,
          });

          query = gqlMutation.query;
          variables = gqlMutation.variables;
        }

        const response = await client.request<BaseRecord>(query, variables);

        return {
          data: response[meta.operation],
        };
      } else {
        throw Error('GraphQL operation name required.');
      }
    } else {
      throw Error(
        'GraphQL needs operation, fields and variables values in meta object.',
      );
    }
  },
};
