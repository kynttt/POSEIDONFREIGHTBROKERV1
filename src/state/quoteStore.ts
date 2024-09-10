// src/store/quoteStore.ts

import create from 'zustand';

interface Quote {
  _id: string;
  price: number;
  origin: string;
  destination: string;
  pickupDate: string;
  trailerType: string;
  companyName: string;
  commodity: string;
}

interface QuoteState {
  quote: Quote | null;
  setQuote: (quote: Quote) => void;
  clearQuote: () => void;
}

export const useQuoteStore = create<QuoteState>((set) => ({
  quote: null,
  setQuote: (quote) => set({ quote }),
  clearQuote: () => set({ quote: null }),
}));
