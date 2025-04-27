import HeaderItem from "@/components/ui/HeaderItem";

const Header = () => {
  return (
    <header className={"w-full flex justify-center items-center"}>
      <div
        className={"w-full max-w-6xl p-4 flex justify-start items-center gap-4"}
      >
        <h3 className={"font-bold text-2xl"}>My Library</h3>
        <HeaderItem label={"Sign Up"} href={"/signup"} />
        <HeaderItem label={"Log In"} href={"/login"} />
      </div>
    </header>
  );
};

export default Header;