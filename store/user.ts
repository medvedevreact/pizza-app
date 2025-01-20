import { create } from "zustand";

interface UserState {
  user: {
    email: string;
    uid: string;
  } | null;
  setUser: (user: { email: string; uid: string } | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
