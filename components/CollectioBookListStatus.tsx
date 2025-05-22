import { Book } from "@/types/books";
import CollectionBookListStatusItem from "./CollectionBookListStatusItem";

type Props = {
  title: string;
  list: Book[];
};
const CollectionBookListStatus = ({ title, list }: Props) => {
  return (
    <div className="flex flex-col gap-4 items-start justify-start">
      <h3 className="capitalize text-2xl">{title}</h3>
      <div className="flex gap-4 items-center justify-start flex-wrap">
        {list.map((book: Book) => (
          <CollectionBookListStatusItem book={book} key={book.key} />
        ))}
      </div>
    </div>
  );
};

export default CollectionBookListStatus;
