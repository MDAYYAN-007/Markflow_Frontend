import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=0");

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch products" },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json({
      success: true,
      products: data.products ?? [],
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    );
  }
}
