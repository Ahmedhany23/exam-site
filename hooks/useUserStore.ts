import { create } from "zustand";
import { persist } from "zustand/middleware";
import { userType } from "@/types/types";

type UserState = {
  user: userType | null;
  setUser: (user: userType | null) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
