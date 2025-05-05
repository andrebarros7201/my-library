import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "@/redux/slices/notificationSlice";
import userSlice from "@/redux/slices/userSlice";
import bookSlice from "@/redux/slices/bookSlice";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    user: userSlice,
    book: bookSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;