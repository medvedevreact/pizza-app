import { create } from "zustand";

interface UserState {
  user: {
    email: string;
    uid: string;
    emailVerified: boolean;
  } | null;
  setUser: (
    user: { email: string; uid: string; emailVerified: boolean } | null
  ) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
