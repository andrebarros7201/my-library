"use client";
import Button from "@/components/ui/Button";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import SearchBar from "./SearchBar";
import BookList from "@/components/BookList";

const AddBook = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleIsModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Button label={"Add Boot to List"} onClick={toggleIsModalOpen} />
      {isModalOpen && (
        <Modal>
          <SearchBar />
          <BookList />
        </Modal>
      )}
    </>
  );
};

export default AddBook;