import { Book } from "@/types/books";
import { RootDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { addBookToCollection } from "@/redux/slices/collectionSlice";
import createNotification from "@/utils/createNotification";

type Props = {
  book: Book;
  closeModal: () => void;
};
const BookListItem = ({ book, closeModal }: Props) => {
  const dispatch = useDispatch<RootDispatch>();
  const { currentCollection } = useSelector(
    (state: RootState) => state.collection,
  );

  async function handleClick() {
    try {
      const response = await dispatch(
        addBookToCollection({
          collectionID: currentCollection!.id,
          book,
        }),
      ).unwrap();
      const { notification } = response;
      createNotification(notification);
    } catch (error) {
      createNotification({ type: "error", message: error as string });
    } finally {
      closeModal();
    }
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
          <p>by {book.author_name.join(", ")}</p>
        </div>
      </div>
    </button>
  );
};

export default BookListItem;
