import { create } from "zustand";
import { User } from "../utils/types";
import { persist } from "zustand/middleware";
interface AuthState {
  role: string | null;
  userId: string | null;
  name: string | null;
  isAuthenticated: boolean | null;
  login: ({ user }: { user: User }) => void;
  logoutUpdate: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuthenticated: null,
      role: null,
      userId: null,
      name: null,
      isLoading: false,
      isError: false,
      error: null,
      

      login: ({ user }: { user: User }) => {
        set({
          role: user.role,
          userId: user.id,
          name: user.name,
          isAuthenticated: true,
        });
      },

      logoutUpdate: () => {
        set({
          isAuthenticated: false,
          role: null,
          userId: null,
          name: null,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
