"use client";
import { FormEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";

const AddCollection = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const { user } = useSelector((state: RootState) => state.user);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <Button
        label={"Create New Collection"}
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <Modal onClick={() => setIsModalOpen(false)}>
          <Form onSubmit={handleSubmit}>
            <Input label={"Title"} type={"text"} id={"title"} />
            <Input
              label={"Description"}
              type={"text"}
              id={"description"}
              required={false}
            />
            <Button label={"Create Collection"} type={"submit"} />
          </Form>
        </Modal>
      )}
    </>
  );
};

export default AddCollection;