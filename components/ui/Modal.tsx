import { ReactNode } from "react";

type Props = {
  children: ReactNode | ReactNode[];
  onClick?: () => void;
};
const Modal = ({ children, onClick }: Props) => {
  return (
    <div
      className={
        "w-screen h-screen z-10 fixed p-4 top-0 left-0 bg-black/70 flex gap-4 justify-center items-center"
      }
      onClick={onClick}
    >
      <div
        className={
          "flex flex-col items-center gap-4 bg-white w-full max-w-3xl h-auto sm:h-full sm:max-h-120 rounded p-4 overflow-y-auto box-border"
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;