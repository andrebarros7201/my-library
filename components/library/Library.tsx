import ProtectedRoute from "@/components/ProtectedRoute";

const Library = () => {
  return (
    <ProtectedRoute>
      <main>
        <h2>Library</h2>
      </main>
    </ProtectedRoute>
  );
};

export default Library;