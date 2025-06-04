import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface UserState {
  user: { id: string; username: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const signUpUser = createAsyncThunk(
  "/user/signup",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post("/api/signup", {
        username,
        password,
      });
      const { notification } = response.data;
      return { notification };
    } catch (error) {
      if (error instanceof AxiosError) {
        const { notification } = error.response!.data;
        return rejectWithValue(notification.message);
      }
      return rejectWithValue("An error occurred. Please try again later.");
    }
  },
);

export const logInUser = createAsyncThunk(
  "user/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      const { user, notification } = response.data;
      return { user, notification };
    } catch (error) {
      if (error instanceof AxiosError) {
        const { notification } = error.response!.data;
        return rejectWithValue(notification.message);
      } else {
        return rejectWithValue("An error occurred. Please try again later.");
      }
    }
  },
);

export const fetchUserInfo = createAsyncThunk(
  "/api/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/me");
      const { user } = response.data;
      return user;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { notification } = error.response!.data;
        return rejectWithValue(notification.message);
      } else {
        return rejectWithValue("An error occurred. Please try again later.");
      }
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

      // SIGNUP
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signUpUser.rejected, (state) => {
        state.isLoading = false;
      })

      // LOGIN
      .addCase(logInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(logInUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      })

      // FETCH USER INFO
      .addCase(fetchUserInfo.pending, (state) => {
        state.isAuthenticated = false;
        state.isLoading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      }),
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
