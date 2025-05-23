import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Collection } from "@/types/collection";
import axios, { AxiosError } from "axios";
import { Book } from "@/types/books";
import { RootState } from "../store";
import Notification from "@/types/notification";

interface CollectionState {
  currentCollection: Collection | null;
  collections: Collection[];
  isLoading: boolean;
}

const initialState: CollectionState = {
  currentCollection: null,
  collections: [],
  isLoading: false,
};

export const createCollection = createAsyncThunk(
  "collection/create",
  async (
    {
      name,
      description = "",
      userID,
    }: { name: string; description?: string; userID: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/collection", {
        name,
        description,
        userID,
      });
      const { collection, notification } = response.data;
      return { collection, notification };
    } catch (error) {
      if (error instanceof AxiosError) {
        const { notification } = error.response!.data;
        return rejectWithValue(notification.message);
      } else {
        return rejectWithValue("Something went wrong. Please try again later.");
      }
    }
  }
);

export const fetchCollections = createAsyncThunk(
  "collection/fetch",
  async ({ userID }: { userID: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/user/${userID}/collection`);
      const { collections } = response.data;
      return collections;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { notification } = error.response!.data;
        return rejectWithValue(notification.message);
      } else {
        return rejectWithValue("Something went wrong. Please try again later.");
      }
    }
  }
);

export const addBookToCollection = createAsyncThunk(
  "collection/add_book",
  async (
    {
      collectionID,
      book,
    }: {
      collectionID: string;
      book: Book;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `/api/collection/${collectionID}/book`,
        {
          book,
        }
      );
      const { notification, collection } = response.data;
      return { notification, collection };
    } catch (error) {
      return rejectWithValue(
        error instanceof AxiosError
          ? error.response?.data?.notification?.message
          : "Something went wrong. Please try again later."
      );
    }
  }
);

export const updateBookStatus = createAsyncThunk(
  "collection/update_book_status",
  async (
    {
      bookID,
      newStatus,
    }: {
      bookID: string;
      newStatus: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(`/api/book/${bookID}`, {
        newStatus,
      });
      const { notification, book } = response.data;
      return { notification, book };
    } catch (error) {
      return rejectWithValue(
        error instanceof AxiosError
          ? error.response?.data?.notification?.message
          : "Something went wrong. Please try again later."
      );
    }
  }
);

export const deleteBook = createAsyncThunk(
  "collection/delete_book",
  async (bookID: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/book/${bookID}`);
      const { notification } = response.data;
      return { notification, bookID };
    } catch (error) {
      return rejectWithValue(
        error instanceof AxiosError
          ? error.response?.data?.notification?.message
          : "Something went wrong. Please try again later."
      );
    }
  }
);

export const updateCollection = createAsyncThunk(
  "collection/update_collection",
  async (
    {
      newName,
      newDescription,
      collectionID,
    }: { newName: string; newDescription?: string; collectionID: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(`/api/collection/${collectionID}`, {
        name: newName,
        description: newDescription,
      });

      const { notification, updatedCollection } = response.data;
      return { notification, updatedCollection };
    } catch (error) {
      return rejectWithValue(
        error instanceof AxiosError
          ? error.response?.data?.notification.message
          : "Something Went Wrong. Please try again later."
      );
    }
  }
);

export const deleteCollection = createAsyncThunk<
  { notification: Notification; collectionID: string },
  { collectionID: string },
  { state: RootState }
>(
  "collection/delete",
  async (
    { collectionID }: { collectionID: string },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState();
      const { collections } = state.collection;
      if (collections.length <= 1)
        throw new Error("There should be at least one collection available");
      const response = await axios.delete(`/api/collection/${collectionID}`);
      const { notification } = response.data;
      return { notification, collectionID };
    } catch (error) {
      return rejectWithValue(
        error instanceof AxiosError
          ? error.response?.data.notification.message
          : error instanceof Error
            ? error.message
            : "Something Went Wrong. Please try again later."
      );
    }
  }
);

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    clearState: (state) => {
      state.currentCollection = null;
      state.collections = [];
      state.isLoading = false;
    },
    setCollection: (state, action: PayloadAction<Collection>) => {
      state.currentCollection = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create a new collection
      .addCase(createCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        const { collection } = action.payload;
        collection.books = [];
        state.isLoading = false;
        state.collections.push(collection);
        if (state.currentCollection == null) {
          state.currentCollection = collection;
        }
      })
      .addCase(createCollection.rejected, (state) => {
        state.isLoading = false;
      })
      // Fetch collections
      .addCase(fetchCollections.pending, (state) => {
        state.isLoading = true;
        state.collections = [];
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collections = action.payload;
        if (state.collections.length > 0) {
          state.currentCollection = state.collections[0];
        }
      })
      .addCase(fetchCollections.rejected, (state) => {
        state.isLoading = false;
        state.collections = [];
      })

      // Add book to collection
      .addCase(addBookToCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        addBookToCollection.fulfilled,
        (
          state,
          action: PayloadAction<{
            notification: { type: string; message: string };
            collection: Collection;
          }>
        ) => {
          const { collection } = action.payload;

          state.isLoading = false;
          state.currentCollection = collection;
        }
      )
      .addCase(addBookToCollection.rejected, (state) => {
        state.isLoading = false;
      })

      // Update book status
      .addCase(updateBookStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBookStatus.fulfilled, (state, action) => {
        const { book } = action.payload;
        const collection = state.currentCollection;
        if (collection) {
          const bookIndex = collection.books.findIndex((b) => b.id === book.id);
          if (bookIndex !== -1) {
            collection.books[bookIndex] = book;
          }
        }
        state.isLoading = false;
      })
      .addCase(updateBookStatus.rejected, (state) => {
        state.isLoading = false;
      })

      // Delete book
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        const { bookID } = action.payload;
        const collection = state.currentCollection;
        if (collection) {
          collection.books = collection.books.filter((b) => b.id !== bookID);
        }
        state.isLoading = false;
      })
      .addCase(deleteBook.rejected, (state) => {
        state.isLoading = false;
      })

      //Update Collection
      .addCase(updateCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        const { updatedCollection } = action.payload;
        state.currentCollection = updatedCollection;
        const collectionIndex = state.collections.findIndex(
          (c) => c.id === updatedCollection.id
        );
        state.collections[collectionIndex] = updatedCollection;
      })
      .addCase(updateCollection.rejected, (state) => {
        state.isLoading = false;
      })

      //Delete Collection
      .addCase(deleteCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        const { collectionID } = action.payload;
        const collectionIndex = state.collections.findIndex(
          (c) => c.id === collectionID
        );

        if (collectionIndex === 0) {
          state.currentCollection = state.collections[1];
        }

        state.currentCollection = state.collections[0];
        state.collections.filter((c) => c.id !== collectionID);
      });
  },
});

export default collectionSlice.reducer;
export const { clearState, setCollection } = collectionSlice.actions;
