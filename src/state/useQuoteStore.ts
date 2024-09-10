// src/store/useQuoteStore.ts
import create from 'zustand';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Quote {
  _id: string;
  origin: string;
  destination: string;
  pickupDate: string;
  deliveryDate: string | null;
  trailerType: string;
  trailerSize: number;
  commodity: string;
  maxWeight: number;
  packaging: string;
  companyName: string;
  distance: string;
  price: number;
  notes: string;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface QuoteStore {
  quote: Quote | null;
  setQuote: (quote: Quote) => void;
  updateQuote: (updatedFields: Partial<Quote>) => void;
  clearQuote: () => void;
}

export const useQuoteStore = create<QuoteStore>((set) => ({
  quote: null,

  // Function to set a new quote
  setQuote: (quote: Quote) => set(() => ({ quote })),

  // Function to update the existing quote fields
  updateQuote: (updatedFields: Partial<Quote>) =>
    set((state) => ({
      quote: state.quote ? { ...state.quote, ...updatedFields } : null,
    })),

  // Function to clear the quote data
  clearQuote: () => set(() => ({ quote: null })),
}));
