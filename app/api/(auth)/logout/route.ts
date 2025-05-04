import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    {
      notification: { type: "success", message: "Logged out successfully!" },
    },
    { status: 200 },
  );

  response.cookies.set({
    name: "token",
    value: "",
    expires: new Date(0),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}