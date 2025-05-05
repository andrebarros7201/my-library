"use client";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    if (searchText.length > 3) console.log(searchText);
  }, [searchText]);

  return (
    <div
      className={
        "w-full max-w-sm border-2 border-gray-500 rounded-xl p-4 antialiased flex gap-4 items-center"
      }
    >
      <input
        className={
          "w-full focus:outline-none placeholder:italic placeholder-gray-500 text-blue-500"
        }
        id={"search"}
        type={"text"}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={"Search for a book. Ex: The Hobbit"}
      />
    </div>
  );
};

export default SearchBar;