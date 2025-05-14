import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Collection } from "@/types/collection";
import axios, { AxiosError } from "axios";

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

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    clearState: (state) => {
      state.currentCollection = null;
      state.collections = [];
      state.isLoading = false;
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
      });
  },
});

export default collectionSlice.reducer;
export const { clearState } = collectionSlice.actions;