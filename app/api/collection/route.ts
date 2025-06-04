import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, description, userID } = await req.json();

    if (!name) {
      return NextResponse.json(
        {
          notification: {
            type: "error",
            message: "Collection name is required",
          },
        },
        { status: 400 },
      );
    }

    if (!userID) {
      return NextResponse.json(
        { notification: { type: "error", message: "Missing User ID" } },
        { status: 400 },
      );
    }

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userID },
    });

    if (!userExists) {
      return NextResponse.json(
        { notification: { type: "error", message: "User not found" } },
        { status: 404 },
      );
    }

    const collection = await prisma.collection.create({
      data: { name, description, userID },
    });

    return NextResponse.json(
      {
        collection,
        notification: {
          type: "success",
          message: "Collection created successfully.",
        },
      },
      { status: 201 },
    );
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
