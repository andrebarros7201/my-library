import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Collection } from "@/types/collection";
import axios, { AxiosError } from "axios";
import { Book } from "@/types/books";

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
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post("/api/collection", {
        name,
        description,
        userID,
      });
      const { collection } = response.data;
      return collection;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { notification } = error.response!.data;
        return rejectWithValue(notification.message);
      } else {
        return rejectWithValue("Something went wrong. Please try again later.");
      }
    }
  },
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
  },
);

export const addBookToCollection = createAsyncThunk(
  "collection/add_book",
  async (
    {
      collectionID,
      bookID,
    }: {
      collectionID: string;
      bookID: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        `/api/collection/${collectionID}/book`,
        {
          bookID,
        },
      );
      const { notification, book, collection } = response.data;
      return { notification, book, collection };
    } catch (error) {
      return rejectWithValue(
        error instanceof AxiosError
          ? error.response?.data?.notification?.message
          : "Something went wrong. Please try again later.",
      );
    }
  },
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
        state.isLoading = false;
        state.collections.push(action.payload);
        if (state.currentCollection == null) {
          state.currentCollection = action.payload;
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
            book: Book;
            collection: Collection;
          }>,
        ) => {
          state.isLoading = false;
          state.currentCollection = action.payload.collection;
        },
      )
      .addCase(addBookToCollection.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default collectionSlice.reducer;
export const { clearState, setCollection } = collectionSlice.actions;