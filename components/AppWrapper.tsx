"use client";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "@/redux/store";
import { fetchUserInfo } from "@/redux/slices/userSlice";

type Props = {
  children: ReactNode;
};

const AppWrapper = ({ children }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, user]);

  return <>{children}</>;
};

export default AppWrapper;