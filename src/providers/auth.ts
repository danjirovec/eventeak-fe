import { AuthProvider } from '@refinedev/core';
import dayjs from 'dayjs';

import { supabaseClient } from '../util';
import { useGlobalStore } from './context/store';
import { CLIENT_URL } from './data';

export const authProvider: AuthProvider = {
  login: async ({ email, password, providerName }) => {
    const { setUser } = useGlobalStore.getState();
    // sign in with oauth
    try {
      if (providerName) {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
          provider: providerName,
        });

        if (error) {
          return {
            success: false,
            error: {
              message: 'Sign in failed',
              name: 'Invalid email or password',
            },
          };
        }

        if (data?.url) {
          return {
            success: true,
            successNotification: {
              message: '',
              description: 'Sign in successful',
            },
            redirectTo: '/dashboard',
          };
        }
      }

      // sign in with email and password
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: {
            message: 'Sign in failed',
            name: 'Invalid email or password',
          },
        };
      }

      if (data?.user) {
        setUser({ accessToken: data.session.access_token, id: data.user.id });
        return {
          success: true,
          successNotification: {
            message: '',
            description: 'Sign in successful',
          },
          redirectTo: '/dashboard',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: false,
      error: {
        message: 'Sign in failed',
        name: 'Invalid email or password',
      },
    };
  },
  register: async (params) => {
    const birthDate = dayjs(params.birthDate).toISOString();
    const email = params.email;
    const password = params.password;
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${CLIENT_URL}login`,
          data: {
            firstName: params.firstName,
            lastName: params.lastName,
            placeOfResidence: params.placeOfResidence,
            birthDate: birthDate,
          },
        },
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
          success: true,
          successNotification: {
            message: 'Verify your email',
            description: 'Sign up successful',
          },
          redirectTo: '/login',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: false,
      error: {
        message: 'Sign up failed',
        name: 'Invalid email or password',
      },
    };
  },
  forgotPassword: async ({ email }) => {
    try {
      const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${CLIENT_URL}update-password`,
        },
      );

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
          success: true,
          successNotification: {
            message: 'Reset link sent',
            description: 'Check your email inbox',
          },
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: false,
      error: {
        message: 'Reset failed',
        name: 'Invalid email',
      },
    };
  },
  updatePassword: async ({ password }) => {
    try {
      const { data, error } = await supabaseClient.auth.updateUser({
        password,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
          success: true,
          successNotification: {
            message: '',
            description: 'Update password successful',
          },
          redirectTo: '/login',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }
    return {
      success: false,
      error: {
        message: 'Update password failed',
        name: 'Invalid password',
      },
    };
  },
  logout: async () => {
    const { setBusiness, setUser } = useGlobalStore.getState();
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    setUser(null);
    setBusiness(null);

    return {
      success: true,
      successNotification: {
        message: '',
        description: 'Logout successful',
      },
      redirectTo: '/login',
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async (params = null) => {
    const { setBusiness, business, setUser } = useGlobalStore.getState();
    try {
      let session = null;

      if (params && params.refresh) {
        const response = await supabaseClient.auth.refreshSession();
        session = response.data.session;
      } else {
        const response = await supabaseClient.auth.getSession();
        session = response.data.session;
      }

      if (!session) {
        return {
          authenticated: false,
          error: {
            message: 'Check failed',
            name: 'Session not found',
          },
          logout: true,
          redirectTo: '/login',
        };
      }

      setUser({ accessToken: session.access_token, id: session.user.id });

      if (!business) {
        const { data: user } = await supabaseClient
          .from('user')
          .select('default_business_id, id')
          .eq('id', session.user.id)
          .limit(1)
          .maybeSingle();

        if (user && user.default_business_id) {
          const { data: business } = await supabaseClient
            .from('business')
            .select('currency, name')
            .eq('id', user.default_business_id)
            .limit(1)
            .single();

          setBusiness({
            name: business?.name,
            id: user.default_business_id,
            currency: business?.currency,
          });
        }
      }
    } catch (error: any) {
      return {
        authenticated: false,
        error: error || {
          message: 'Check failed',
          name: 'Not authenticated',
        },
        logout: true,
        redirectTo: '/login',
      };
    }

    return {
      authenticated: true,
    };
  },
  getPermissions: async () => {
    const user = await supabaseClient.auth.getUser();

    if (user) {
      return user.data.user?.role;
    }

    return null;
  },
  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser();

    if (data?.user) {
      return {
        ...data.user,
      };
    }

    return null;
  },
};
