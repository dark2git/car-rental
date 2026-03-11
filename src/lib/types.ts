export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  price: number;
  mileage: number;
  year: number;
  type: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  image: string;
  description: string;
};

export type ApiCar = {
  id: string;
  brand: string;
  model: string;
  year: number;
  type: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  mileage: number;
  img: string;
  rentalPrice: string;
  description: string;
};

export type VehicleFilters = {
  brand?: string;
  price?: number;
  mileageFrom?: number;
  mileageTo?: number;
};

export type FetchVehiclesParams = VehicleFilters & {
  page?: number;
  limit?: number;
};

export type FetchVehiclesResponse = {
  items: Vehicle[];
  total: number;
  page: number;
  limit: number;
};

export type BookingPayload = {
  vehicleId: string;
  name: string;
  email: string;
  date: string;
  comment?: string;
};
