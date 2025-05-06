'use client';

import { useAction } from 'next-safe-action/hooks';
import { useEffect } from 'react';

import { getCurrentUserAction } from '../actions/current-user';
import { useAuthStore } from '../auth-slice';

export const useCurrentUser = () => {
  const { user, login, logout, setLoading } = useAuthStore();

  const { execute, isPending } = useAction(getCurrentUserAction, {
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

  return {
    user,
    isLoading: isPending,
  };
};
