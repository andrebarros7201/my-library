import Modal from "@/components/ui/Modal";
import { Book } from "@/types/books";
import Image from "next/image";
import Button from "./ui/Button";
import { useDispatch } from "react-redux";
import { RootDispatch } from "@/redux/store";
import createNotification from "@/utils/createNotification";
import { updateBookStatus } from "@/redux/slices/collectionSlice";

type Props = {
  onClick: () => void;
  book: Book;
};

const ModalBook = ({ book, onClick }: Props) => {
  const dispatch = useDispatch<RootDispatch>();

  const bookStatus =
    book.status === "NOT_READ"
      ? "Not Read"
      : book.status === "CURRENTLY_READING"
        ? "Currently Reading"
        : "Finished";

  async function handleUpdateBookStatus(status: string) {
    try {
      const response = await dispatch(
        updateBookStatus({ bookID: book.id, newStatus: status })
      ).unwrap();

      const { notification } = response;
      createNotification(notification);
    } catch (error) {
      createNotification({
        type: "error",
        message: error as string,
      });
    }
  }
  return (
    <Modal onClick={onClick}>
      <div className="w-full h-full flex flex-col sm:flex-row gap-4 items-center">
        <Image
          src={book.imageURL_L}
          width={100}
          height={600}
          alt={`cover image of ${book.title}`}
          className="w-1/2 h-full object-cover"
          style={{
            objectFit: "contain",
          }}
        />
        <div className="w-full h-full flex flex-col items-center justify-between gap-4 flex-1">
          <h3 className="font-bold text-2xl w-full text-center">
            {book.title}
          </h3>
          <p>by {book.author_name.join(", ")}</p>
          <p>First Published In: {book.first_publish_year}</p>
          <p>Current Status: {bookStatus} </p>
          <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">
            {!(bookStatus === "Not Read") && (
              <Button
                label="Not Read"
                onClick={() => handleUpdateBookStatus("NOT_READ")}
              />
            )}
            {!(bookStatus === "Currently Reading") && (
              <Button
                label="Currently Reading"
                onClick={() => handleUpdateBookStatus("CURRENTLY_READING")}
              />
            )}
            {!(bookStatus === "Finished") && (
              <Button
                label="Finished"
                onClick={() => handleUpdateBookStatus("FINISHED")}
              />
            )}
            <Button label="Remove Book" variant="danger" />
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalBook;
