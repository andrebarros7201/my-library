"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "@/redux/store";
import { Collection } from "@/types/collection";
import { setCollection } from "@/redux/slices/collectionSlice";

const CollectionDropdown = () => {
  const { collections, currentCollection } = useSelector(
    (state: RootState) => state.collection,
  );

  const dispatch = useDispatch<RootDispatch>();

  function handleClick({ collection }: { collection: Collection }) {
    dispatch(setCollection(collection));
  }

  return (
    <div className={"flex flex-col gap-4 group/dropdown"}>
      <h3 className={"font-bold text-3xl "}>{currentCollection?.name}</h3>
      <div className={"hidden group-hover/dropdown:block"}>
        <div className={"flex flex-col gap-2 max-h-20 overflow-y-auto"}>
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
      </div>
    </div>
  );
};

export default CollectionDropdown;