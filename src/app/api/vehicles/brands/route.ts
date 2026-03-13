import { NextResponse } from "next/server";

export async function GET() {
  const externalApiBase = process.env.EXTERNAL_API_BASE;

  if (!externalApiBase) {
    return NextResponse.json(
      { message: "EXTERNAL_API_BASE is not configured" },
      { status: 500 },
    );
  }

  const response = await fetch(`${externalApiBase}/brands`);

  if (!response.ok) {
    return NextResponse.json(
      { message: "Failed to fetch brands" },
      { status: response.status },
    );
  }

  const data = (await response.json()) as string[];
  return NextResponse.json(data);
}
