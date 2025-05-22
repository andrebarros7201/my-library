import Modal from "@/components/ui/Modal";
import { Book } from "@/types/books";
import Image from "next/image";

type Props = {
  onClick: () => void;
  book: Book;
};

const ModalBook = ({ book, onClick }: Props) => {
  const bookStatus =
    book.status === "NOT_READ"
      ? "Not Read"
      : book.status === "CURRENTLY_READING"
        ? "Currently Reading"
        : "Finished";
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
        <div className="w-full h-full border-2 border-red-500 flex flex-col items-center justify-start gap-4 flex-1">
          <h3 className="font-bold text-2xl w-full text-center">
            {book.title}
          </h3>
          <p>by {book.author_name.join(", ")}</p>
          <p>First Published In: {book.first_publish_year}</p>
          <p>Current Status: {bookStatus} </p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalBook;
