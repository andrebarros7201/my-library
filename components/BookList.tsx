"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const BookList = () => {
  const { bookList } = useSelector((state: RootState) => state.book);

  if (bookList?.length === 0) return null;

  return <div className={"w-full border-2 border-red-500"}></div>;
};

export default BookList;