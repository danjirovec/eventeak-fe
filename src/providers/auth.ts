import { AuthProvider } from '@refinedev/core';
import dayjs from 'dayjs';

import { supabaseClient } from '../util';

export const authProvider: AuthProvider = {
  login: async ({ email, password, providerName }) => {
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
              message: 'Login failed',
              name: 'Invalid email or password',
            },
          };
        }

        if (data?.url) {
          return {
            success: true,
            successNotification: {
              message: '',
              description: 'Login successful',
            },
            redirectTo: '/',
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
            message: 'Login failed',
            name: 'Invalid email or password',
          },
        };
      }

      if (data?.user) {
        return {
          success: true,
          successNotification: {
            message: '',
            description: 'Login successful',
          },
          redirectTo: '/',
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
        message: 'Login failed',
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
        email,
        password,
        options: {
          emailRedirectTo: 'http://localhost:5173/login',
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
        message: 'Register failed',
        name: 'Invalid email or password',
      },
    };
  },
  forgotPassword: async ({ email }) => {
    try {
      const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `http://localhost:5173/update-password`,
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
        message: 'Forgot password failed',
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
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    sessionStorage.removeItem('business');

    return {
      success: true,
      redirectTo: '/',
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async () => {
    try {
      const { data } = await supabaseClient.auth.getSession();
      const { session } = data;

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

      if (!sessionStorage.getItem('business')) {
        const { data: user } = await supabaseClient
          .from('user')
          .select('default_business_id, id')
          .eq('id', data.session.user.id)
          .limit(1)
          .maybeSingle();

        if (user && user.default_business_id) {
          const { data: business } = await supabaseClient
            .from('business')
            .select('name')
            .eq('id', user.default_business_id)
            .limit(1)
            .single();

          sessionStorage.setItem(
            'business',
            JSON.stringify({
              id: user.default_business_id,
              name: business?.name,
            }),
          );
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
