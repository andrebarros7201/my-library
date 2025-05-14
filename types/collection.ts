import { Book } from "@/types/books";

export interface Collection {
  id: string;
  title: string;
  description?: string;
  userID: string;
  books: Book[];
}