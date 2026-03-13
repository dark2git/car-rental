import { NextResponse } from "next/server";
import type { ApiCar, Vehicle } from "@/lib/types";

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

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  const externalApiBase = process.env.EXTERNAL_API_BASE;

  if (!externalApiBase) {
    return NextResponse.json(
      { message: "EXTERNAL_API_BASE is not configured" },
      { status: 500 },
    );
  }

  const { id } = await context.params;

  const response = await fetch(`${externalApiBase}/cars/${id}`);

  if (response.status === 404) {
    return NextResponse.json({ message: "Vehicle not found" }, { status: 404 });
  }

  if (!response.ok) {
    return NextResponse.json(
      { message: "Failed to fetch vehicle" },
      { status: response.status },
    );
  }

  const data = (await response.json()) as ApiCar;
  return NextResponse.json(mapCarToVehicle(data));
}
