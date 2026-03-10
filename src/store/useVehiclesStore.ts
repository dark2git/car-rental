import { create } from "zustand";
import type { Vehicle, VehicleFilters } from "@/lib/types";

type VehiclesState = {
  vehicles: Vehicle[];
  filters: VehicleFilters;
  favorites: string[];
  setFilters: (filters: VehicleFilters) => void;
  toggleFavorite: (id: string) => void;
};

export const useVehiclesStore = create<VehiclesState>((set) => ({
  vehicles: [],
  filters: {},
  favorites: [],
  setFilters: (filters) => set({ filters }),
  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((fav) => fav !== id)
        : [...state.favorites, id],
    })),
}));
