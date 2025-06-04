"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "@/redux/store";
import { Collection } from "@/types/collection";
import { setCollection } from "@/redux/slices/collectionSlice";
import arrow from "@/public/arrow-down.svg";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const CollectionDropdown = () => {
  const { collections, currentCollection } = useSelector(
    (state: RootState) => state.collection,
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(() => false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClick({ collection }: { collection: Collection }) {
    dispatch(setCollection(collection));
    setIsDropdownOpen(false);
  }

  return (
    <div
      className="relative flex flex-col items-center shadow-xl bg-gray-100 cursor-pointer"
      ref={wrapperRef}
    >
      <div
        className="flex gap-2 p-4 items-center w-80 justify-between"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <h3 className="font-bold text-2xl cursor-pointer truncate">
          {currentCollection?.name}
        </h3>
        <Image
          src={arrow}
          alt="Arrow"
          width={20}
          height={20}
          className={`transition-all duration-200 ease-in-out ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 w-full z-10 mt-1">
          <div className="flex flex-col gap-2 overflow-y-auto max-h-60 shadow-lg rounded-md bg-gray-200 p-2 antialiased">
            {collections?.map((collection) => (
              <div
                className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                key={collection.id}
                onClick={() => handleClick({ collection })}
              >
                {collection.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionDropdown;

