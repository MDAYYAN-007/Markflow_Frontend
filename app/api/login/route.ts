import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (token) {
      return NextResponse.json(
        { message: "Already authenticated" },
        { status: 200 },
      );
    }

    const { username, password } = await req.json();

    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 },
      );
    }

    const data = await res.json();

    const response = NextResponse.json(
      {
        user: {
          id: data.id,
          username: data.username,
          email: data.email,
        },
      },
      { status: 200 },
    );

    response.cookies.set("token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
