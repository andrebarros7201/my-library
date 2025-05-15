import ProtectedRoute from "@/components/ProtectedRoute";
import AddBook from "@/components/AddBook";
import AddCollection from "@/components/AddCollection";
import CollectionDropdown from "@/components/CollectionDropdown";

const Library = () => {
  return (
    <ProtectedRoute>
      <main className={"w-full flex flex-col justify-start items-start gap-4"}>
        <div className={"w-full flex justify-start items-start gap-4"}>
          <AddCollection />
          <AddBook />
        </div>
        <CollectionDropdown />
      </main>
    </ProtectedRoute>
  );
};

export default Library;