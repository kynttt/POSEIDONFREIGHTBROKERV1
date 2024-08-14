import Cookies from "js-cookie";
import { create } from "zustand";
import { getUser } from "../lib/apiCalls";

interface AuthState {
  isAuthenticated: boolean | null;
  role: string | null;
  userId: string | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  login: (token: string) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: null,
  role: null,
  userId: null,
  isLoading: false,
  isError: false,
  error: null,

  login: (token: string) => {
    Cookies.set("authToken", token, { expires: 7 }); // Set cookie with 7 days expiration
    set({
      isAuthenticated: null,
      isLoading: true,
      isError: false,
      error: null,
    });
    // Fetch the user information from the server after setting the token
    get().fetchUser();
  },

  logout: () => {
    Cookies.remove("authToken");
    set({
      isAuthenticated: false,
      role: null,
      userId: null,
      isLoading: false,
      isError: false,
      error: null,
    });
  },

  fetchUser: async () => {
    const tokenFromCookies = Cookies.get("authToken");

    if (!tokenFromCookies) {
      set({ isAuthenticated: false, isLoading: false });
      return;
    }

    const { userId } = get();

    if (!userId) {
      set({ isLoading: true, isError: false, error: null });
      try {
        const user = await getUser();

        set({
          isAuthenticated: true,
          role: user.role,
          userId: user._id,
          isLoading: false,
          isError: false,
          error: null,
        });
      } catch (error: any) {
        console.error("Failed to fetch user info:", error);
        set({
          isAuthenticated: false,
          role: null,
          userId: null,
          isLoading: false,
          isError: true,
          error:
            error.response?.data?.msg ||
            error.message ||
            "Failed to fetch user info",
        });
        Cookies.remove("authToken");
      }
    } else {
      set({ isAuthenticated: true, isLoading: false });
    }
  },
}));
