import { NextRequest, NextResponse } from "next/server";
import type { ApiCar, Vehicle } from "@/lib/types";

type CarsApiResponse = {
  cars: ApiCar[];
  totalCars: number;
  page: string;
};

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

export async function GET(request: NextRequest) {
  const externalApiBase = process.env.EXTERNAL_API_BASE;

  if (!externalApiBase) {
    return NextResponse.json(
      { message: "EXTERNAL_API_BASE is not configured" },
      { status: 500 },
    );
  }

  const search = request.nextUrl.searchParams;

  const page = search.get("page") ?? "1";
  const limit = search.get("limit") ?? "4";
  const brand = search.get("brand");
  const rentalPrice = search.get("rentalPrice");
  const minMileage = search.get("minMileage");
  const maxMileage = search.get("maxMileage");

  const params = new URLSearchParams({ page, limit });

  if (brand) params.set("brand", brand);
  if (rentalPrice) params.set("rentalPrice", rentalPrice);
  if (minMileage) params.set("minMileage", minMileage);
  if (maxMileage) params.set("maxMileage", maxMileage);

  const response = await fetch(`${externalApiBase}/cars?${params.toString()}`);

  if (!response.ok) {
    return NextResponse.json(
      { message: "Failed to fetch vehicles" },
      { status: response.status },
    );
  }

  const data = (await response.json()) as CarsApiResponse;

  return NextResponse.json({
    items: data.cars.map(mapCarToVehicle),
    total: data.totalCars,
    page: Number(data.page),
    limit: Number(limit),
  });
}
