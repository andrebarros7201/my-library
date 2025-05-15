import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { Book } from "@/types/books";

export async function POST(req: NextRequest) {
  try {
    const { book }: { book: Book } = await req.json();

    const checkBookExists = await prisma.book.findUnique({
      where: { id: book.key },
    });

    if (checkBookExists) {
      return NextResponse.json({ book: checkBookExists }, { status: 200 });
    }

    const newBook = await prisma.book.create({
      data: {
        id: book.key,
        cover_i: book.cover_i,
        imageURL_S: book.imageURL_S,
        imageURL_M: book.imageURL_M,
        imageURL_L: book.imageURL_L,
        has_fulltext: book.has_fulltext,
        edition_count: book.edition_count,
        title: book.title,
        author_name: book.author_name,
        first_publish_year: book.first_publish_year,
        ia: book.ia,
        author_key: book.author_key,
        public_scan_b: book.public_scan_b,
      },
    });

    return NextResponse.json({ book: newBook }, { status: 201 });
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