import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ userID: string }> },
) {
  try {
    const { userID } = await context.params;

    if (!userID) {
      return NextResponse.json(
        {
          notification: { type: "error", message: "Missing User ID" },
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { id: userID } });

    if (!user) {
      return NextResponse.json(
        {
          notification: { type: "error", message: "User not found" },
        },
        { status: 404 },
      );
    }

    const collections = await prisma.collection.findMany({
      where: { userID },
    });

    return NextResponse.json({ collections }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      notification: {
        type: "error",
        message: "An error occurred. Please try again later.",
      },
    });
  }
}