import { create } from 'zustand';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  user: {
    id: string;
    role: string;
  };
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  role: string | null;
  userId: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const getInitialState = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return {
      isAuthenticated: true,
      token,
      role: decodedToken.user.role,
      userId: decodedToken.user.id,
    };
  }
  return {
    isAuthenticated: false,
    token: null,
    role: null,
    userId: null,
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialState(),
  login: (token: string) => {
    localStorage.setItem('authToken', token);
    const decodedToken = jwtDecode<DecodedToken>(token);
    set({
      isAuthenticated: true,
      token,
      role: decodedToken.user.role,
      userId: decodedToken.user.id,
    });
  },
  logout: () => {
    localStorage.removeItem('authToken');
    set({ isAuthenticated: false, token: null, role: null, userId: null });
  },
}));
