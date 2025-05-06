"use client";
import { FormEvent, useState } from "react";
import { RootDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { fetchBooks } from "@/redux/slices/bookSlice";
import Button from "@/components/ui/Button";
import BookList from "./BookList";

const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>("");

  const dispatch = useDispatch<RootDispatch>();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (searchText.length < 3) {
      return;
    }

    dispatch(fetchBooks({ searchText: searchText }));
  }
  return (
    <div
      className={
        "w-full max-w-sm flex flex-col gap-2 justify-start items-center"
      }
    >
      <form
        className={
          "w-full border-2 border-gray-500 rounded-xl p-4 antialiased flex gap-4 items-center"
        }
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          className={
            "w-full focus:outline-none placeholder:italic placeholder-gray-500 text-blue-500"
          }
          id={"search"}
          type={"text"}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={"Search for a book. Ex: The Hobbit"}
          minLength={3}
        />
        <Button label={"Search"} type={"submit"} variant={"primary"} />
      </form>
      <BookList />
    </div>
  );
};

export default SearchBar;