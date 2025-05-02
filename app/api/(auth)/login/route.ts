import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { comparePassword } from "@/utils/password";

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

    return NextResponse.json(
      { user: { id: user.id, username: user.username } },
      { status: 200 },
    );
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