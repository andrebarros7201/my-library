"use client";
import Button from "@/components/ui/Button";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import SearchBar from "./SearchBar";
import BookList from "@/components/library/bookList/BookList";

const AddBook = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        label={"Add Book to Collection"}
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <Modal onClick={() => setIsModalOpen(false)}>
          <SearchBar />
          <BookList closeModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
};

export default AddBook;
