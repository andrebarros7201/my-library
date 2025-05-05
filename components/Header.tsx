"use client";
import HeaderItem from "@/components/ui/HeaderItem";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Logout from "@/components/Logout";

const Header = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

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
            <>
              <HeaderItem label={"Library"} href={"/library"} />
              <Logout />
            </>
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