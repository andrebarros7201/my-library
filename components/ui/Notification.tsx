"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "@/redux/store";
import clsx from "clsx";
import { clearNotification } from "@/redux/slices/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch<RootDispatch>();
  const { isVisible, notification } = useSelector(
    (state: RootState) => state.notification,
  );
  if (!isVisible) return null;

  const { type, message } = notification!;

  return (
    isVisible && (
      <div className={"absolute top-4 p-4 w-full max-w-sm"}>
        <div
          className={clsx(
            "w-full flex flex-col gap-2 justify-start rounded text-white p-4",
            {
              "bg-red-500": type === "error",
              "bg-green-500": type === "success",
            },
          )}
        >
          <div className={"flex justify-between items-center"}>
            <h3 className={"capitalize font-bold text-xl"}>{type}</h3>
            <button
              className={"text-2xl font-bold cursor-pointer"}
              onClick={() => {
                dispatch(clearNotification());
              }}
            >
              X
            </button>
          </div>
          <p className={"w-full capitalize"}>{message}</p>
        </div>
      </div>
    )
  );
};

export default Notification;