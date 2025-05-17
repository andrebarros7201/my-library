import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

//TODO check if user has a collection with this book

// ADD A NEW BOOK TO COLLECTION
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ collectionID: string }> },
) {
  try {
    const { collectionID } = await context.params;
    const { book } = await req.json();

    if (!book) {
      return NextResponse.json(
        { notification: { type: "error", message: "Failed to add book" } },
        { status: 400 },
      );
    }

    const newBook = await prisma.book.create({
      data: {
        cover_i: book.cover_i,
        imageURL_S: `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`,
        imageURL_M: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
        imageURL_L: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
        edition_count: book.edition_count,
        title: book.title,
        author_name: book.author_name,
        first_publish_year: book.first_publish_year,
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