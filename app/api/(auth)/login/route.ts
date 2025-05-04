import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { comparePassword } from "@/utils/password";
import { signJWT } from "@/utils/jwt";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true, username: true, password: true },
    });

    if (!user) {
      return NextResponse.json(
        { notification: { type: "error", message: "User not found!" } },
        { status: 404 },
      );
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          notification: {
            type: "error",
            message: "Incorrect username/password combination!",
          },
        },
        { status: 401 },
      );
    }

    const token = signJWT({ id: user.id, username: user.username });

    const response = NextResponse.json(
      { user: { id: user.id, username: user.username } },
      { status: 200 },
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 2,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        notification: {
          type: "error",
          message: "An error occurred. Please try again later.",
        },
      },
      { status: 500 },
    );
  }
}