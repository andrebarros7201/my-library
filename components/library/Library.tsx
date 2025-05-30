import ProtectedRoute from "@/components/ProtectedRoute";
import AddBook from "@/components/AddBook";
import AddCollection from "@/components/AddCollection";
import CollectionDropdown from "@/components/CollectionDropdown";
import CollectionBookList from "@/components/CollectionBookList";
import CollectionSettings from "../CollectionSettings";

const Library = () => {
  return (
    <ProtectedRoute>
      <main className={"w-full flex flex-col justify-start items-start gap-4"}>
        <div className={"w-full flex justify-start items-start gap-4"}>
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
