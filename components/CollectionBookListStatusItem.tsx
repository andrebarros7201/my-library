"use client";
import { useState } from "react";
import { Book } from "@/types/books";
import Image from "next/image";
import ModalBook from "@/components/ModalBook";

type Props = {
  book: Book;
};
const CollectionBookListStatusItem = ({ book }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <div
        className="w-40 h-60 flex flex-col gap-4 items-center justify-center p-4 cursor-pointer rounded hover:scale-110 hover:bg-gray-300 transition-all duration-150 ease-in-out"
        onClick={() => setIsModalOpen(true)}
      >
        {book.cover_i ? (
          <Image
            src={book.imageURL_M}
            height={100}
            width={75}
            alt={`cover of ${book.title}`}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="w-full text-center font-bold">Image not provided</p>
          </div>
        )}
        <p className="text-center">{book.title}</p>
      </div>
      {isModalOpen && (
        <ModalBook onClick={() => setIsModalOpen(false)} book={book} />
      )}
    </>
  );
};

export default CollectionBookListStatusItem;
