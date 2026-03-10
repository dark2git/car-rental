export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  image: string;
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
