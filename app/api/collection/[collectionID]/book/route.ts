import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

// ADD A NEW BOOK TO CURRENT COLLECTION
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ collectionID: string }> },
) {
  try {
    const { collectionID } = await context.params;
    const { book } = await req.json();

    // Fetch collection
    const collection = await prisma.collection.findUnique({
      where: { id: collectionID },
    });

    // If collection was not found return error notification
    if (!collection)
      return NextResponse.json(
        { notification: { type: "error", message: "Collection not found" } },
        { status: 404 },
      );

    // Check if book was not provided
    if (!book) {
      return NextResponse.json(
        { notification: { type: "error", message: "Failed to add book" } },
        { status: 400 },
      );
    }

    // Check if user already has this book
    const userHasBook = await prisma.book.findFirst({
      where: {
        AND: [
          {
            userID: collection.userID,
          },
          {
            key: book.key,
          },
        ],
      },
    });

    // If it does, connect that book with the current collection
    if (userHasBook) {
      // Check if current collection already has this book
      const collectionAlreadyHasBook = await prisma.collection.findFirst({
        where: { id: collectionID, books: { some: { id: userHasBook.id } } },
      });

      if (collectionAlreadyHasBook) {
        return NextResponse.json(
          {
            notification: {
              type: "error",
              message: "This collection already has this book",
            },
          },
          { status: 400 },
        );
      }

      await prisma.collection.update({
        where: { id: collectionID },
        data: { books: { connect: { id: userHasBook.id } } },
      });

      const updatedCollection = await prisma.collection.findUnique({
        where: { id: collectionID },
        include: {
          books: true,
        },
      });

      return NextResponse.json(
        {
          notification: {
            type: "success",
            message: "Book Added to Collection",
          },
          collection: updatedCollection,
        },
        { status: 200 },
      );
    }

    const newBook = await prisma.book.create({
      data: {
        userID: collection.userID,
        cover_i: book.cover_i ? book.cover_i : null,
        key: book.key,
        imageURL_S: `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`,
        imageURL_M: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
        imageURL_L: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
        edition_count: book.edition_count,
        title: book.title,
        author_name: book.author_name,
        first_publish_year: book.first_publish_year
          ? book.first_publish_year
          : null,
        status: "NOT_READ",
      },
    });

    await prisma.collection.update({
      where: { id: collectionID },
      data: {
        books: {
          connect: { id: newBook.id },
        },
      },
    });

    const updatedCollection = await prisma.collection.findUnique({
      where: { id: collectionID },
      include: {
        books: true,
      },
    });

    return NextResponse.json(
      {
        notification: {
          type: "success",
          message: "Book added to collection.",
        },
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

