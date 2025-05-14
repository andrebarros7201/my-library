"use client";
import { FormEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import createNotification from "@/utils/createNotification";

const AddCollection = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const { user } = useSelector((state: RootState) => state.user);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const name = nameRef.current?.value;
    const description = descriptionRef.current?.value;

    if (!name) {
      createNotification({ type: "error", message: "name is required" });
      return;
    }
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
            <Input label={"name"} type={"text"} id={"name"} ref={nameRef} />
            <Input
              label={"Description"}
              type={"text"}
              id={"description"}
              required={false}
              ref={descriptionRef}
            />
            <Button label={"Create Collection"} type={"submit"} />
          </Form>
        </Modal>
      )}
    </>
  );
};

export default AddCollection;