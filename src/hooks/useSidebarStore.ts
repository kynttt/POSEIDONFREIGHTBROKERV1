import { create } from "zustand";

interface SidebarState {
  enable: boolean;
  isExtend: boolean;

  setIsExtend: (value: boolean) => void;
  setEnable: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  enable: true, // default value, can be toggled
  isExtend: false,

  setIsExtend: (value: boolean) =>
    set((state) => {
      // Allow toggling isExtend only if enable is true
      if (state.enable) {
        return { isExtend: value };
      }
      return state;
    }),

  setEnable: (value: boolean) =>
    set((state) => {
      // When enable is false, force isExtend to true
      if (!value) {
        return { enable: value, isExtend: true };
      }
      // When enable is true, keep the current value of isExtend
      return { enable: value, isExtend: state.isExtend };
    }),
}));
