import { Book } from "@/types/books";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface BookSliceState {
  currentBook: Book | null;
  bookList: Book[] | null;
}

const initialState: BookSliceState = {
  currentBook: null,
  bookList: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setCurrentBook: (state, action) => {
      state.currentBook = action.payload;
    },
    setBookList: (state, action) => {
      state.bookList = action.payload;
    },
  },
});

export default bookSlice.reducer;
export const { setCurrentBook, setBookList } = bookSlice.actions;