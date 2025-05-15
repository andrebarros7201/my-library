import { Book } from "@/types/books";

export interface Collection {
  id: string;
  name: string;
  description?: string;
  userID: string;
  books: Book[];
}