import clsx from "clsx";

type Props = {
  label: string;
  variant?: "primary" | "secondary" | "warning" | "danger";
  type?: "submit" | "button";
  onClick?: () => void;
};

const Button = ({
  label,
  variant = "primary",
  onClick,
  type = "button",
}: Props) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 text-white rounded shadow-md transition-all duration-300 ease-in-out cursor-pointer",
        {
          "bg-blue-500 hover:bg-blue-700": variant === "primary",
          "bg-gray-500 hover:bg-gray-700": variant === "secondary",
          "bg-yellow-500 hover:bg-yellow-700": variant === "warning",
          "bg-red-500 hover:bg-red-700": variant === "danger",
        },
      )}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;