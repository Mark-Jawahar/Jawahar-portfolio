import { create } from "zustand";

interface StoreState {
  isMenuOpen: boolean;
  isCommandPaletteOpen: boolean;
  toggleMenu: () => void;
  setMenuOpen: (open: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  isMenuOpen: false,
  isCommandPaletteOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),
}));
