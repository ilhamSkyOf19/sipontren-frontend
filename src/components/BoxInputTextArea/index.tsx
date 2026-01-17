import { type FC } from "react";
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
};
const BoxInputTextArea: FC<Props> = ({
  label,
  name,
  placeholder,
  required,
  errorMessage,
  register,
}) => {
  return (
    <div className="w-full h-80 flex flex-col justify-start items-start">
      {/* label */}
      <label htmlFor="name" className="text-base relative">
        {label}

        <span className="absolute -top-1 ml-1 text-primary-red">
          {required && "*"}
        </span>
      </label>

      <div
        className={clsx(
          "w-full px-4 py-3 h-full border border-primary-brown rounded-lg mt-2 focus-within:shadow-[0_4px_6px_0_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out focus-within:-translate-y-1",
          errorMessage && "border-primary-red"
        )}
      >
        <textarea
          {...register}
          name={name}
          id={name}
          placeholder={placeholder}
          className="w-full h-full border-none outline-none text-base placeholder:text-sm"
        />
      </div>

      {/* error message */}
      <ErrorMessageInput errorMessage={errorMessage} />
    </div>
  );
};

export default BoxInputTextArea;
