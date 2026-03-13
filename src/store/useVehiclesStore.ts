import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchVehicles } from "@/lib/api";
import type { Vehicle, VehicleFilters } from "@/lib/types";

const sanitizeFilters = (filters: VehicleFilters): VehicleFilters => {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== undefined),
  ) as VehicleFilters;
};

type VehiclesState = {
  vehicles: Vehicle[];
  favorites: string[];
  filters: VehicleFilters;
  page: number;
  limit: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
  setFilterValue: <K extends keyof VehicleFilters>(
    key: K,
    value: VehicleFilters[K] | undefined,
  ) => void;
  setFilters: (filters: VehicleFilters) => Promise<void>;
  applyFilters: () => Promise<void>;
  resetResults: () => void;
  loadVehicles: (append?: boolean) => Promise<void>;
  toggleFavorite: (vehicleId: string) => void;
};

export const useVehiclesStore = create<VehiclesState>()(
  persist(
    (set, get) => ({
      vehicles: [],
      favorites: [],
      filters: {},
      page: 1,
      limit: 4,
      hasMore: true,
      isLoading: false,
      error: null,

      setFilterValue: (key, value) => {
        set((state) => ({
          filters: sanitizeFilters({
            ...state.filters,
            [key]: value,
          }),
        }));
      },

      setFilters: async (filters) => {
        set({
          filters: sanitizeFilters(filters),
          page: 1,
          vehicles: [],
          hasMore: true,
          error: null,
        });

        await get().loadVehicles(false);
      },

      applyFilters: async () => {
        const { filters } = get();

        await get().setFilters(filters);
      },

      resetResults: () => {
        set({
          vehicles: [],
          page: 1,
          hasMore: true,
          error: null,
        });
      },

      loadVehicles: async (append = true) => {
        const { page, limit, filters, vehicles } = get();

        set({ isLoading: true, error: null });

        try {
          const data = await fetchVehicles({
            page,
            limit,
            ...filters,
          });

          const nextItems = data.items ?? [];

          set({
            vehicles: append ? [...vehicles, ...nextItems] : nextItems,
            page: append ? page + 1 : 2,
            hasMore: nextItems.length === limit,
            isLoading: false,
          });
        } catch {
          set({
            isLoading: false,
            error: "Failed to load vehicles",
          });
        }
      },

      toggleFavorite: (vehicleId) => {
        set((state) => {
          const exists = state.favorites.includes(vehicleId);

          return {
            favorites: exists
              ? state.favorites.filter((id) => id !== vehicleId)
              : [...state.favorites, vehicleId],
          };
        });
      },
    }),
    {
      name: "car-rental-storage",
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
