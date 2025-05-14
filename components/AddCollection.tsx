"use client";
import { FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "@/redux/store";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import createNotification from "@/utils/createNotification";
import { createCollection } from "@/redux/slices/collectionSlice";

const AddCollection = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<RootDispatch>();

  const { user } = useSelector((state: RootState) => state.user);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const name = nameRef.current!.value;
    const description = descriptionRef.current?.value;

    if (!name) {
      createNotification({ type: "error", message: "name is required" });
      return;
    }

    try {
      await dispatch(
        createCollection({ name, description, userID: user!.id }),
      ).unwrap();
      createNotification({
        type: "success",
        message: "Collection created successfully!",
      });
      setIsModalOpen(false);
    } catch (error: unknown) {
      createNotification({ type: "error", message: error as string });
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