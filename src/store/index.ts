import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { useAuthStore } from '@/features/auth';

export type StoreState = {
  auth: ReturnType<typeof useAuthStore.getState>;
};

export const useStore = create<StoreState>()(
  devtools(() => ({
    auth: useAuthStore.getState(),
  }))
);
