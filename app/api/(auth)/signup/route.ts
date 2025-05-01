import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/utils/password";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      return NextResponse.json(
        { notification: { type: "error", message: "User already exists." } },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        notification: {
          type: "success",
          message: "User created successfully.",
        },
      },
      { status: 201 },
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