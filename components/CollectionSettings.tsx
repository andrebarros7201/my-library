"use client";
import Image from "next/image";
import DeleteCollection from "./DeleteCollection";
import UpdateCollection from "./UpdateCollection";
import settingSVG from "@/public/settings.svg";
import { useEffect, useRef, useState } from "react";

const CollectionSettings = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsOpen(() => false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative inline-block gap-4 cursor-pointer"
      ref={divRef}
      onClick={() => setIsOpen((isOpen) => !isOpen)}
    >
      <Image src={settingSVG} height={32} width={32} alt="image of a gear" />
      {isOpen && (
        <div className="absolute flex flex-col gap-4 p-4 bg-gray-100 rounded shadow-xl">
          <UpdateCollection />
          <DeleteCollection />
        </div>
      )}
    </div>
  );
};

export default CollectionSettings;
