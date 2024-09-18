// src/state/usePaymentStore.ts
import create from 'zustand';

interface PaymentState {
  currency: string;
  paymentMethodId: string | undefined;
  userId: string | undefined;
  setCurrency: (currency: string) => void;
  setPaymentMethodId: (paymentMethodId: string | undefined) => void;
  setUserId: (userId: string | undefined) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  currency: 'usd', // Default currency
  paymentMethodId: undefined,
  userId: undefined,
  setCurrency: (currency) => set({ currency }),
  setPaymentMethodId: (paymentMethodId) => set({ paymentMethodId }),
  setUserId: (userId) => set({ userId }),
}));