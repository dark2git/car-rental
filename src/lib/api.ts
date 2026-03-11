import axios from "axios";
import type {
  ApiCar,
  BookingPayload,
  FetchVehiclesParams,
  FetchVehiclesResponse,
  Vehicle,
} from "@/lib/types";

const api = axios.create({
  baseURL: "https://car-rental-api.goit.global",
  headers: {
    "Content-Type": "application/json",
  },
});

const mapCarToVehicle = (car: ApiCar): Vehicle => ({
  id: car.id,
  brand: car.brand,
  model: car.model,
  year: car.year,
  type: car.type,
  rentalCompany: car.rentalCompany,
  address: car.address,
  rentalConditions: car.rentalConditions,
  fuelConsumption: car.fuelConsumption,
  engineSize: car.engineSize,
  accessories: car.accessories,
  functionalities: car.functionalities,
  mileage: car.mileage,
  image: car.img,
  price: Number(car.rentalPrice),
  description: car.description,
});

export const fetchVehicles = async (
  params: FetchVehiclesParams,
): Promise<FetchVehiclesResponse> => {
  const response = await api.get<{
    cars: ApiCar[];
    totalCars: number;
    page: string;
    totalPages: number;
  }>("/cars", {
    params: {
      page: params.page,
      limit: params.limit,
      brand: params.brand,
      rentalPrice: params.price,
      minMileage: params.mileageFrom,
      maxMileage: params.mileageTo,
    },
  });

  return {
    items: response.data.cars.map(mapCarToVehicle),
    total: response.data.totalCars,
    page: Number(response.data.page),
    limit: params.limit ?? 4,
  };
};

export const fetchVehicleById = async (id: string): Promise<Vehicle> => {
  const response = await api.get<ApiCar>(`/cars/${id}`);
  return mapCarToVehicle(response.data);
};

export const fetchBrands = async (): Promise<string[]> => {
  const response = await api.get<string[]>("/brands");
  return response.data;
};

export const submitBooking = async (
  payload: BookingPayload,
): Promise<{ message: string }> => {
  const response = await axios.post<{ message: string }>(
    "/api/bookings",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};
