"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const BookList = () => {
  const { bookList } = useSelector((state: RootState) => state.book);

  if (bookList?.length === 0) return null;

  return (
    <div
      className={
        "w-full z-20 rounded-xl p-4 border-2 border-gray-500 max-h-40 overflow-y-auto"
      }
    >
      {bookList?.map((book) => <div key={book.key}>{book.title}</div>)}
    </div>
  );
};

export default BookList;