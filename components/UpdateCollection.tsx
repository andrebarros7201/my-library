"use client";
import { FormEvent, useRef, useState } from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import Form from "./ui/Form";
import Input from "./ui/Input";
import { useDispatch } from "react-redux";
import { RootDispatch, RootState } from "@/redux/store";
import createNotification from "@/utils/createNotification";
import { updateCollection } from "@/redux/slices/collectionSlice";
import { useSelector } from "react-redux";

const UpdateCollection = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const newNameRef = useRef<HTMLInputElement>(null);
  const newDescriptionRef = useRef<HTMLInputElement>(null);

  const { currentCollection } = useSelector(
    (state: RootState) => state.collection
  );
  const dispatch = useDispatch<RootDispatch>();

  async function handleUpdateCollection(e: FormEvent) {
    e.preventDefault();
    try {
      const newName = newNameRef.current!.value;
      const newDescription = newDescriptionRef.current?.value;

      if (!newName) {
        createNotification({
          type: "error",
          message: "Name field is required",
        });
        return;
      }

      const response = await dispatch(
        updateCollection({
          newName,
          newDescription,
          collectionID: currentCollection!.id,
        })
      ).unwrap();

      const { notification } = response;
      createNotification(notification);
    } catch (error) {
      createNotification({ type: "error", message: error as string });
    }
  }

  return (
    <>
      <Button
        label="Update Collection"
        variant="secondary"
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <Modal onClick={() => setIsModalOpen(false)}>
          <Form onSubmit={(e: FormEvent) => handleUpdateCollection(e)}>
            <Input label="New Name" type="text" id="name" ref={newNameRef} />
            <Input
              label="New Description"
              type="text"
              id="description"
              required={false}
              ref={newDescriptionRef}
            />
            <Button type="submit" label="Update Collection" />
          </Form>
        </Modal>
      )}
    </>
  );
};

export default UpdateCollection;
