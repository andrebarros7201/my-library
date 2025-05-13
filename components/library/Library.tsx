import ProtectedRoute from "@/components/ProtectedRoute";
import AddBook from "@/components/AddBook";

const Library = () => {
  return (
    <ProtectedRoute>
      <main className={"w-full flex flex-col justify-start items-start gap-4"}>
        <AddBook />
      </main>
    </ProtectedRoute>
  );
};

export default Library;