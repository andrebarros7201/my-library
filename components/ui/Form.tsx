import { ReactNode } from "react";

type Props = {
  children: ReactNode | ReactNode[];
  onSubmit: () => void;
};

const Form = ({ children, onSubmit }: Props) => {
  return (
    <form
      className={"w-full max-w-xl flex flex-col gap-8 p-4"}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;