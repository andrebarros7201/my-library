"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "@/redux/store";
import { Collection } from "@/types/collection";
import { setCollection } from "@/redux/slices/collectionSlice";
import arrow from "@/public/arrow-down.svg";
import { useState } from "react";
import Image from "next/image";

const CollectionDropdown = () => {
  const { collections, currentCollection } = useSelector(
    (state: RootState) => state.collection,
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dispatch = useDispatch<RootDispatch>();

  function handleClick({ collection }: { collection: Collection }) {
    dispatch(setCollection(collection));
    setIsDropdownOpen(false);
  }

  return (
    <div className={"flex flex-col gap-4 w-80"}>
      <div
        className={"flex gap-2 items-center w-full justify-start"}
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        <h3 className={"font-bold text-3xl cursor-pointer"}>
          {currentCollection?.name}{" "}
        </h3>
        <Image
          src={arrow}
          alt={"Arrow"}
          width={20}
          height={20}
          className={`transition-all duration-200 ease-in-out ${isDropdownOpen ? "rotate-180" : ""}`}
        />
      </div>
      {isDropdownOpen && (
        <div
          className={
            "flex flex-col gap-2 shadow-lg rounded-xl overflow-y-auto p-4 bg-gray-100 w-full max-h-120 antialiased"
          }
        >
          {collections?.map((collection) => (
            <div
              className={"cursor-pointer"}
              key={collection.id}
              onClick={() => handleClick({ collection })}
            >
              {collection.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionDropdown;