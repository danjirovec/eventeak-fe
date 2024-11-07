import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Currency } from 'graphql/schema.types';

type BusinessState = { name: string; id: string; currency: Currency } | null;
type UserState = { accessToken: string; id: string } | null;

interface GlobalState {
  business: BusinessState;
  setBusiness: (business: BusinessState) => void;
  user: UserState;
  setUser: (user: UserState) => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      business: null,
      setBusiness: (newBusiness: BusinessState) =>
        set({ business: newBusiness }),
      user: null,
      setUser: (newUser: UserState) => set({ user: newUser }),
    }),
    {
      name: 'store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
