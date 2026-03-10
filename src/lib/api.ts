import axios from "axios";
import type { FetchVehiclesParams, Vehicle } from "@/lib/types";

const api = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

export const fetchVehicles = async (
  _params: FetchVehiclesParams,
): Promise<Vehicle[]> => {
  const response = await api.get<{ cars: unknown[] }>("/cars");
  return response.data.cars as Vehicle[];
};

export const fetchVehicleById = async (id: string): Promise<Vehicle> => {
  const response = await api.get<Vehicle>(`/cars/${id}`);
  return response.data;
};
