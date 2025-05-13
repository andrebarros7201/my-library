import { Book } from "@/types/books";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface BookSliceState {
  currentBook: Book | null;
  bookList: Book[] | null;
  isLoading: boolean;
}

const initialState: BookSliceState = {
  currentBook: null,
  bookList: [],
  isLoading: false,
};

export const fetchBooks = createAsyncThunk(
  "books/fetch",
  async ({ searchText }: { searchText: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${searchText}`,
      );
      const { docs } = response.data;

      const transformedBooks: Book[] = docs.map((book: any) => {
        return {
          cover_i: book.cover_i,
          has_fulltext: book.has_fulltext,
          edition_count: book.edition_count,
          title: book.title,
          author_name: book.author_name,
          first_publish_year: book.first_publish_year,
          key: book.key.split("/")[book.key.split("/").length - 1],
          ia: book.ia,
          author_key: book.author_key,
          public_scan_b: book.public_scan_b,
        };
      });

      console.log(transformedBooks);
      return transformedBooks;
    } catch (error) {
      return rejectWithValue({
        notification: {
          type: "error",
          message: "An error occurred. Please try again later.",
        },
      });
    }
  },
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setCurrentBook: (state, action: PayloadAction<Book>) => {
      state.currentBook = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      // FETCH BOOKS
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.bookList = action.payload;
        state.currentBook = null;
        state.isLoading = false;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.bookList = [];
        state.currentBook = null;
        state.isLoading = false;
      }),
});

export default bookSlice.reducer;
export const { setCurrentBook } = bookSlice.actions;