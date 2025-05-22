"use client";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import CollectionBookListStatus from "./CollectioBookListStatus";

// TODO: Display list for each reading status

const CollectionBookList = () => {
  const { currentCollection } = useSelector(
    (state: RootState) => state.collection,
  );
  if (currentCollection) {
    const books = currentCollection.books;
    const notReadBooks = books.filter((x) => x.status === "NOT_READ");
    const currentlyReadingBooks = books.filter(
      (x) => x.status === "CURRENTLY_READING",
    );
    const finishedBooks = books.filter((x) => x.status === "FINISHED");

    return (
      <main className="w-full flex flex-col gap-4 items-start justify-start">
        <CollectionBookListStatus list={notReadBooks} title={"Not Read"} />
        <CollectionBookListStatus
          list={currentlyReadingBooks}
          title={"Currently Reading"}
        />
        <CollectionBookListStatus list={finishedBooks} title={"Finished"} />
      </main>
    );
  }
};

export default CollectionBookList;
