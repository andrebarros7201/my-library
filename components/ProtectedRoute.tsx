"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Props = {
  children: ReactNode;
};
const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return <>{children}</>;
  return null;
};

export default ProtectedRoute;