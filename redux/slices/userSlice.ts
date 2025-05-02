import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface UserState {
  user: { userID: string; username: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
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
      state.isLoading = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signUpUser.rejected, (state) => {
        state.isLoading = false;
      }),
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;