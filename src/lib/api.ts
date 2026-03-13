import axios from "axios";
import type {
  BookingPayload,
  FetchVehiclesParams,
  FetchVehiclesResponse,
  Vehicle,
} from "@/lib/types";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchVehicles = async (
  params: FetchVehiclesParams,
): Promise<FetchVehiclesResponse> => {
  const response = await api.get<FetchVehiclesResponse>("/vehicles", {
    params: {
      page: params.page,
      limit: params.limit,
      brand: params.brand,
      rentalPrice: params.price,
      minMileage: params.mileageFrom,
      maxMileage: params.mileageTo,
    },
  });

  return response.data;
};

export const fetchVehicleById = async (id: string): Promise<Vehicle> => {
  const response = await api.get<Vehicle>(`/vehicles/${id}`);
  return response.data;
};

export const fetchBrands = async (): Promise<string[]> => {
  const response = await api.get<string[]>("/vehicles/brands");
  return response.data;
};

export const submitBooking = async (
  payload: BookingPayload,
): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>("/bookings", payload);
  return response.data;
};
