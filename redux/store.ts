import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "@/redux/slices/notificationSlice";
import userSlice from "@/redux/slices/userSlice";
import bookSlice from "@/redux/slices/bookSlice";
import collectionSlice from "@/redux/slices/collectionSlice";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    user: userSlice,
    book: bookSlice,
    collection: collectionSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;