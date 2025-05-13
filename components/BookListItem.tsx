import { Book } from "@/types/books";
import { RootDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setCurrentBook } from "@/redux/slices/bookSlice";

type Props = {
  book: Book;
  closeModal: () => void;
};
const BookListItem = ({ book, closeModal }: Props) => {
  const dispatch = useDispatch<RootDispatch>();

  function handleClick() {
    dispatch(setCurrentBook(book));
    closeModal();
  }

  return (
    <button className={"w-full cursor-pointer text-left"} onClick={handleClick}>
      {book.title} by {book.author_name}
    </button>
  );
};

export default BookListItem;