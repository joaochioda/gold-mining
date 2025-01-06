import { create } from "zustand";

interface UserStoreState {
  user: string | null;
  setUser: (user: string | null) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  setUser: (user: string | null) => set({ user }),
}));
