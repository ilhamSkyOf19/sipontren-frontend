import { useState, type FC } from "react";
import clsx from "clsx";
import type { UseFormRegisterReturn } from "react-hook-form";
import ErrorMessageInput from "../ErrorMessageInput";

type Props = {
  name: string;
  placeholder: string;
  label: string;
  required?: boolean;
  errorMessage?: string;
  register: UseFormRegisterReturn;
  max: number;
};
const BoxInputNumber: FC<Props> = ({
  label,
  name,
  placeholder,
  required,
  errorMessage,
  register,
  max,
}) => {
  // state value
  const [isValue, setIsValue] = useState<string>("");

  return (
    <div className="w-full flex flex-col justify-start items-start">
      {/* label */}
      <label
        htmlFor="name"
        className="w-full text-base relative flex flex-row justify-between items-center"
      >
        <div className="flex-2 relative">
          <span>{label}</span>

          <span className="absolute -top-1 ml-1 text-primary-red">
            {required && "*"}
          </span>
        </div>

        {/* max */}
        <span className="text-xs">
          {isValue.length}/{max}
        </span>
      </label>
      <div
        className={clsx(
          "w-full px-4 py-1 h-11 border border-secondary-blue rounded-lg mt-2 focus-within:shadow-[0_4px_6px_0_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out focus-within:-translate-y-1",
          errorMessage && "border-primary-red",
        )}
      >
        <input
          {...register}
          type="number"
          name={name}
          id={name}
          placeholder={placeholder}
          className="w-full h-full border-none outline-none text-base placeholder:text-sm"
          onChange={(e) => setIsValue(e.target.value)}
          maxLength={max}
        />
      </div>

      {/* error message */}
      <ErrorMessageInput errorMessage={errorMessage} />
    </div>
  );
};

export default BoxInputNumber;
