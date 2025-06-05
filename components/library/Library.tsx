import ProtectedRoute from "@/components/ProtectedRoute";
import AddBook from "@/components/library/book/AddBook";
import AddCollection from "@/components/library/collection/AddCollection";
import CollectionDropdown from "@/components/library/collection/CollectionDropdown";
import CollectionBookList from "@/components/library/collectionBookList/CollectionBookList";
import CollectionSettings from "./collection/CollectionSettings";

const Library = () => {
  return (
    <ProtectedRoute>
      <main className={"w-full flex flex-col justify-start items-start gap-4"}>
        <div
          className={"w-full flex flex-wrap justify-start items-start gap-4"}
        >
          <AddCollection />
          <AddBook />
        </div>
        <div className="flex gap-4 items-center">
          <CollectionDropdown />
          <CollectionSettings />
        </div>
        <CollectionBookList />
      </main>
    </ProtectedRoute>
  );
};

export default Library;
