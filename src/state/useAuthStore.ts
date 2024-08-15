import Cookies from "js-cookie";
import { create } from "zustand";
import { getUser } from "../lib/apiCalls";
import { User } from "../utils/types";

interface AuthState {
  role: string | null;
  userId: string | null;
  isAuthenticated: boolean | null;
  login: (token: string) => void;
  logoutUpdate: () => void;
  fetchUser: () => Promise<User | undefined>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: null,
  role: null,
  userId: null,
  isLoading: false,
  isError: false,
  error: null,

  login: (token: string) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + 60 * 60 * 1000);
    Cookies.set("authToken", token, { expires });
    set({
      isAuthenticated: true,
    });
  },

  logoutUpdate: () => {
    set({
      isAuthenticated: false,
      role: null,
      userId: null,
    });
  },

  fetchUser: async () => {
    const tokenFromCookies = Cookies.get("authToken");

    if (!tokenFromCookies) {
      set({
        isAuthenticated: false,
        role: null,
        userId: null,
      });
      return;
    }

    const { userId } = get();

    if (!userId) {
      try {
        const user = await getUser();

        set({
          isAuthenticated: true,
          role: user.role,
          userId: user._id,
        });

        return user;
      } catch (error: any) {
        console.error("Failed to fetch user info:", error);
        set({
          isAuthenticated: false,
          role: null,
          userId: null,
        });
        Cookies.remove("authToken");

        throw error;
      }
    }
  },
}));
