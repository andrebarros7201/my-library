"use client";
import HeaderItem from "@/components/ui/HeaderItem";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "@/redux/store";
import { logout } from "@/redux/slices/userSlice";

const Header = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<RootDispatch>();
  return (
    <header className={"w-full flex justify-center items-center"}>
      <div
        className={
          "w-full max-w-6xl p-4 flex justify-between items-center gap-4"
        }
      >
        <h3 className={"font-bold text-2xl"}>My Library</h3>
        <div className={"flex gap-4"}>
          <HeaderItem label={"Home"} href={"/"} />
        </div>
        <div className={"flex gap-4"}>
          {isAuthenticated ? (
            <HeaderItem
              label={"Logout"}
              onClick={() => {
                dispatch(logout());
              }}
            />
          ) : (
            <>
              <HeaderItem label={"Sign Up"} href={"/signup"} />
              <HeaderItem label={"Log In"} href={"/login"} />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;