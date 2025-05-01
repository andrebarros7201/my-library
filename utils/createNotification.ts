import {
  setNotification,
  NotificationType,
} from "@/redux/slices/notificationSlice";
import store from "@/redux/store";

export default function createNotification(notification: {
  type: NotificationType;
  message: string;
}) {
  store.dispatch(setNotification(notification));
}