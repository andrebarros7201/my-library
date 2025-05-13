"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import BookListItem from "@/components/BookListItem";

const BookList = () => {
  const { bookList } = useSelector((state: RootState) => state.book);

  if (bookList?.length === 0) return null;

  return (
    <div
      className={
        "w-full z-20 rounded-xl flex flex-col p-4 gap-2 border-2 border-gray-500 overflow-y-auto"
      }
    >
      {bookList?.map((book) => <BookListItem book={book} key={book.key} />)}
    </div>
  );
};

export default BookList;