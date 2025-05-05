import ProtectedRoute from "@/components/ProtectedRoute";
import SearchBar from "@/components/SearchBar";

const Library = () => {
  return (
    <ProtectedRoute>
      <main className={"w-full flex flex-col justify-start items-start gap-4"}>
        <SearchBar />
      </main>
    </ProtectedRoute>
  );
};

export default Library;