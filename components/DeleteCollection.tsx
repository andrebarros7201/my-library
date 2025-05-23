"use client";
import { useSelector } from "react-redux";
import Button from "./ui/Button";
import { RootDispatch, RootState } from "@/redux/store";
import createNotification from "@/utils/createNotification";
import { useDispatch } from "react-redux";
import { deleteCollection } from "@/redux/slices/collectionSlice";

const DeleteCollection = () => {
  const { currentCollection } = useSelector(
    (state: RootState) => state.collection
  );
  const dispatch = useDispatch<RootDispatch>();

  async function handleDeleteCollection() {
    try {
      const response = await dispatch(
        deleteCollection({ collectionID: currentCollection!.id })
      ).unwrap();
      const { notification } = response;
      createNotification(notification);
    } catch (error) {
      createNotification({ type: "error", message: error as string });
    }
  }

  return (
    <Button
      label="Delete Collection"
      variant="danger"
      onClick={() => handleDeleteCollection()}
    />
  );
};

export default DeleteCollection;
