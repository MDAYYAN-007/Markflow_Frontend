import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("name");

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category is required" },
        { status: 400 },
      );
    }
    let url = "";

    if (category === "all") {
      url = "https://dummyjson.com/products?limit=0";
    } else {
      url = `https://dummyjson.com/products/category/${category}?limit=0`;
    }

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to fetch category products");
    }

    const data = await res.json();

    return NextResponse.json({
      success: true,
      products: data.products,
      total: data.total,
    });
  } catch (error: any) {
    console.error("Category API error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
