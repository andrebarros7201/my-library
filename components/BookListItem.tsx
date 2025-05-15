import { Book } from "@/types/books";
import { RootDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { createBook } from "@/redux/slices/bookSlice";
import Image from "next/image";

type Props = {
  book: Book;
  closeModal: () => void;
};
const BookListItem = ({ book, closeModal }: Props) => {
  const dispatch = useDispatch<RootDispatch>();

  function handleClick() {
    dispatch(createBook({ book }));
    closeModal();
  }

  return (
    <button className={"w-full cursor-pointer text-left"} onClick={handleClick}>
      <div className={"flex gap-2"}>
        <Image
          src={book.imageURL_M}
          alt={`Cover of ${book.title}`}
          width={50}
          height={75}
        />
        <div className={"grid grid-rows-2 gap-2"}>
          <h3 className={"font-bold text-lg"}>{book.title}</h3>
          <p>by {book.author_name}</p>
        </div>
      </div>
    </button>
  );
};

export default BookListItem;