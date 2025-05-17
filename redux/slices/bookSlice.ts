import { Book } from "@/types/books";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface BookSliceState {
  bookList: Book[];
  isLoading: boolean;
}

const initialState: BookSliceState = {
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
          imageURL_S: `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`,
          imageURL_M: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
          imageURL_L: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
          edition_count: book.edition_count,
          title: book.title,
          author_name: book.author_name,
          first_publish_year: book.first_publish_year,
          key: book.key.split("/")[book.key.split("/").length - 1],
        };
      });

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
  reducers: {},
  extraReducers: (builder) =>
    builder
      // FETCH BOOKS
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.bookList = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.bookList = [];
        state.isLoading = false;
      }),
});

export default bookSlice.reducer;