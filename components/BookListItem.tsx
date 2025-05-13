import { Book } from "@/types/books";
import { RootDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setCurrentBook } from "@/redux/slices/bookSlice";

type Props = {
  book: Book;
};
const BookListItem = ({ book }: Props) => {
  const dispatch = useDispatch<RootDispatch>();

  function handleClick() {
    dispatch(setCurrentBook(book));
  }

  return (
    <button className={"w-full cursor-pointer text-left"} onClick={handleClick}>
      {book.title} by {book.author_name}
    </button>
  );
};

export default BookListItem;