import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NotificationType = "success" | "error";

interface NotificationState {
  type: NotificationType | null;
  message: string | null;
}

const initialState: NotificationState = {
  type: null,
  message: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearNotification: (state) => {
      state.type = null;
      state.message = null;
    },
    setNotification: (
      state,
      action: PayloadAction<{ type: NotificationType; message: string }>,
    ) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
  },
});

export default notificationSlice.reducer;
export const { clearNotification, setNotification } = notificationSlice.actions;