import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NotificationType = "success" | "error";

interface NotificationState {
  isVisible: boolean;
  notification: {
    type: NotificationType;
    message: string;
  } | null;
}

const initialState: NotificationState = {
  isVisible: true,
  notification: {
    type: "error",
    message: "teste",
  },
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearNotification: (state) => {
      state.isVisible = false;
      state.notification = null;
    },
    setNotification: (
      state,
      action: PayloadAction<{ type: NotificationType; message: string }>,
    ) => {
      state.isVisible = true;
      state.notification = action.payload;
    },
  },
});

export default notificationSlice.reducer;
export const { clearNotification, setNotification } = notificationSlice.actions;