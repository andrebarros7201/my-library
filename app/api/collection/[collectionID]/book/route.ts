import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ collectionID: string }> },
) {
  try {
    const { collectionID } = await context.params;
    const { bookID } = await req.json();

    const book = await prisma.book.findUnique({ where: { id: bookID } });

    if (!book) {
      return NextResponse.json(
        { notification: { type: "error", message: "Book not found" } },
        { status: 404 },
      );
    }

    const collection = await prisma.collection.findUnique({
      where: { id: collectionID },
    });

    if (!collection) {
      return NextResponse.json(
        { notification: { type: "error", message: "Collection not found" } },
        { status: 404 },
      );
    }

    await prisma.collection.update({
      where: { id: collectionID },
      data: {
        books: {
          connect: { id: bookID },
        },
      },
    });

    const updatedCollection = await prisma.collection.findUnique({
      where: { id: collectionID },
      include: {
        books: true,
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: collection.userID },
    });

    if (!user) {
      return NextResponse.json(
        { notification: { type: "error", message: "User not found" } },
        { status: 404 },
      );
    }

    await prisma.userBook.create({
      data: {
        userID: user.id,
        bookID: bookID,
        status: "NOT_READ",
      },
    });

    return NextResponse.json(
      {
        notification: {
          type: "success",
          message: "Book added to collection.",
        },
        book,
        collection: updatedCollection,
      },
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