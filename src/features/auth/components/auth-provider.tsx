'use client';

import { useEffect } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { getCurrentUserAction } from '../actions/current-user';
import { useAuthStore } from '../auth-slice';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { login, logout, setLoading } = useAuthStore();

  const { execute } = useAction(getCurrentUserAction, {
    onSuccess: ({ data }) => {
      if (data?.success && data.user) {
        login({
          ...data.user,
          role: data.user.role,
        });
      } else logout();
      setLoading(false);
    },
    onError: () => {
      logout();
      setLoading(false);
    },
  });

  useEffect(() => {
    setLoading(true);
    execute({});
  }, [execute, setLoading]);

  return <>{children}</>;
}
