import { create } from "zustand";

interface ProductState {
  searchQuery: string;
  category: string | null;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string | null) => void;
  resetFilters: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  searchQuery: "",
  category: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCategory: (category) => set({ category }),
  resetFilters: () => set({ searchQuery: "", category: null }),
}));
