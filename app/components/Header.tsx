const Header = () => {
  return (
    <header className={"w-full flex justify-center items-center"}>
      <div
        className={
          "w-full max-w-6xl p-4 border-2 border-green-500 flex justify-start"
        }
      >
        <h3 className={"font-bold text-2xl"}>My Library</h3>
      </div>
    </header>
  );
};

export default Header;