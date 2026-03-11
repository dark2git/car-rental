import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const hasRequired = Boolean(
    body?.vehicleId && body?.name && body?.email && body?.date,
  );

  if (!hasRequired) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  return NextResponse.json({ message: "Vehicle successfully booked" });
}
