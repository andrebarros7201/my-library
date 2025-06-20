import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ collectionID: string }> }
) {
  try {
    const { collectionID } = await context.params;
    const { name, description } = await req.json();

    const collection = await prisma.collection.findUnique({
      where: { id: collectionID },
    });

    if (!collection)
      return NextResponse.json(
        { notification: { type: "error", message: "Collection not found!" } },
        { status: 404 }
      );

    const updatedCollection = await prisma.collection.update({
      where: { id: collectionID },
      data: { name, description },
      include: { books: true },
    });

    return NextResponse.json(
      {
        notification: { type: "success", message: "Collection Updated" },
        updatedCollection,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { notification: { type: "error", message: "Something went wrong!" } },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ collectionID: string }> }
) {
  try {
    const { collectionID } = await context.params;

    if (!collectionID)
      return NextResponse.json(
        {
          notification: {
            type: "error",
            message: "Collection ID not provided",
          },
        },
        { status: 400 }
      );

    const collection = await prisma.collection.findUnique({
      where: { id: collectionID },
    });

    if (!collection)
      return NextResponse.json(
        {
          notification: { type: "error", message: "Collection not found" },
        },
        { status: 404 }
      );

    await prisma.collection.delete({ where: { id: collectionID } });
    return NextResponse.json(
      { notification: { type: "success", message: "Collection Deleted!" } },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { notification: { type: "error", message: "Something went wrong!" } },
      { status: 500 }
    );
  }
}
