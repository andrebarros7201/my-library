"use client";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "@/redux/store";
import { fetchUserInfo } from "@/redux/slices/userSlice";
import { fetchCollections } from "@/redux/slices/collectionSlice";

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

  useEffect(() => {
    if (user) {
      dispatch(fetchCollections({ userID: user.id }));
    }
  }, [user, dispatch]);

  return <>{children}</>;
};

export default AppWrapper;