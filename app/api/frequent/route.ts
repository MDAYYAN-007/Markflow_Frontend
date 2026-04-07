import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=0");

    const data = await res.json();

    const frequent = data.products
      .filter((p: any) => p.rating > 4)
      .sort((a: any, b: any) => b.rating - a.rating)
      .slice(0, 20);

    return NextResponse.json({
      success: true,
      products: frequent,
    });
  } catch (e) {
    return NextResponse.json(
      { success: false, message: "Failed to load frequent" },
      { status: 500 },
    );
  }
}
