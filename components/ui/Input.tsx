import { forwardRef } from "react";

type Props = {
  label: string;
  type: "text" | "password" | "number";
  id: string;
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      type,
      maxLength,
      minLength,
      minValue,
      maxValue,
      required = true,
      id,
      placeholder,
      disabled = false,
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col items-start justify-start w-full gap-4 md:text-2xl">
        <label className={"capitalize font-bold w-full text-left"} htmlFor={id}>
          {label}
        </label>
        <input
          className={
            "w-full px-4 py-2 border-b-2 border-b-transparent bg-gray-200 focus:outline-none focus:border-b-blue-500 transition-all duration-300 ease-in-out text-blue-500"
          }
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          {...(type !== "number"
            ? {
                minLength: minLength,
                maxLength: maxLength,
              }
            : {
                min: minValue,
                max: maxValue,
              })}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;