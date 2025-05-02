import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import createNotification from "@/utils/createNotification";

interface UserState {
  user: { userID: string; username: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const signUpUser = createAsyncThunk(
  "user/signup",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      await axios.post("/api/signup", {
        username,
        password,
      });
      createNotification({
        type: "success",
        message: "Account created successfully.",
      });
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { notification } = error.response!.data;
        return rejectWithValue(notification.message);
      }
      return rejectWithValue("An error occurred. Please try again later.");
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      }),
});

export default userSlice.reducer;
export const { logout, clearError } = userSlice.actions;