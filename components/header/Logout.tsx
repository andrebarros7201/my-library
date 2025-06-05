import HeaderItem from "@/components/ui/HeaderItem";
import { useDispatch } from "react-redux";
import { RootDispatch } from "@/redux/store";
import axios from "axios";
import createNotification from "@/utils/createNotification";
import { logout } from "@/redux/slices/userSlice";
import { clearState } from "@/redux/slices/collectionSlice";
import { clearNotification } from "@/redux/slices/notificationSlice";

const Logout = () => {
  const dispatch = useDispatch<RootDispatch>();

  async function handleLogout() {
    try {
      const response = await axios.post("/api/logout");
      const { notification } = response.data;
      createNotification(notification);
      dispatch(logout());
      dispatch(clearState());
      dispatch(clearNotification());
    } catch (error) {
      console.error(error);
      createNotification({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    }
  }
  return <HeaderItem label={"Logout"} onClick={() => handleLogout()} />;
};

export default Logout;