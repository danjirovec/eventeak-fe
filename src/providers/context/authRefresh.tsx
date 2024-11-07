import React, { useEffect, ReactNode } from 'react';
import { authProvider } from '../auth';

const AuthRefresh = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const refreshAuth = async () => {
      await authProvider.check({ refresh: true });
    };

    const intervalId = setInterval(() => {
      refreshAuth();
    }, 1800000);
    refreshAuth();
    return () => clearInterval(intervalId);
  }, []);

  return <>{children}</>;
};

export default AuthRefresh;
