import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "@/redux/slices/notificationSlice";
import userSlice from "@/redux/slices/userSlice";

const store = configureStore({
  reducer: { notification: notificationSlice, user: userSlice },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;