import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "@/redux/slices/notificationSlice";

const store = configureStore({ reducer: { notification: notificationSlice } });

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;