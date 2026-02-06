import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=0");

    const data = await res.json();
    const products = data.products;

    const categories = Array.from(
      new Set(products.map((p: any) => p.category)),
    );

    const categoryCounts: Record<string, number> = {};
    products.forEach((p: any) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    const totalProducts = products.length;

    return NextResponse.json({
      categories,
      categoryCounts,
      totalProducts,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
