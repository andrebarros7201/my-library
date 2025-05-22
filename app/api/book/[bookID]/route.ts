import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ bookID: string }> }
) {
  try {
    const { newStatus } = await req.json();
    const { bookID } = await context.params;

    const book = await prisma.book.findUnique({
      where: { id: bookID },
    });

    if (!book) {
      return new Response(
        JSON.stringify({
          notification: {
            type: "error",
            message: "Book not found",
          },
        }),
        { status: 404 }
      );
    }

    const updatedBook = await prisma.book.update({
      where: { id: bookID },
      data: {
        status: newStatus,
      },
    });

    return NextResponse.json(
      {
        notification: { type: "success", message: "Book status updated" },
        book: updatedBook,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        notification: {
          type: "error",
          message: "Something went wrong. Please try again later.",
        },
      },
      { status: 500 }
    );
  }
}
