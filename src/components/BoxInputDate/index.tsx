import { useEffect, useRef, useState } from "react";
import type { FieldValues, UseControllerReturn } from "react-hook-form";
import clsx from "clsx";
import { formatDateID, getTodayLocal } from "../../utils/utils";
import { Calendar } from "lucide-react";
import ErrorMessageInput from "../ErrorMessageInput";

type Props<T extends FieldValues = any> = {
  label: string;
  required: boolean;
  controller: UseControllerReturn<T>;
  oldValue?: Date;
};

function BoxInputDate<TFieldValues extends FieldValues = any>({
  controller,
  label,
  required,
  oldValue,
}: Props<TFieldValues>) {
  // state value
  const [isValue, setIsValue] = useState<string>("");

  // field
  const { field, fieldState } = controller;

  const refInputDate = useRef<HTMLInputElement>(null);

  // set value if old values is existing
  useEffect(() => {
    if (field.value) {
      setIsValue(formatDateID(new Date(field.value)));
    } else if (oldValue) {
      // hanya dipakai saat pertama kali
      field.onChange(oldValue.toISOString());
      setIsValue(formatDateID(new Date(oldValue)));
    }
  }, [field.value, oldValue]);

  return (
    <div className="w-full flex flex-col justify-start items-start">
      {/* label */}
      <label htmlFor="name" className="text-base relative">
        {label}

        <span className="absolute -top-1 ml-1 text-primary-red">
          {required && "*"}
        </span>
      </label>

      <div
        className={clsx(
          "w-full px-4 py-1 h-11 border border-secondary-blue rounded-lg mt-2 relative focus-within:shadow-[0_4px_6px_0_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out focus-within:-translate-y-1 flex flex-row justify-start items-center gap-3",
          fieldState.error?.message && "border-primary-red",
        )}
      >
        <input
          ref={refInputDate}
          type="date"
          className="absolute opacity-0"
          onChange={(e) => {
            const value = e.target.value;
            if (!value) return;
            field.onChange(new Date(value).toISOString());
            setIsValue(formatDateID(new Date(value)));
          }}
          max={getTodayLocal()}
        />

        {/* icon */}
        <button
          type="button"
          onClick={() => refInputDate.current?.showPicker()}
          className="z-20"
        >
          <Calendar size={20} className="text-secondary-blue" />
        </button>

        {/* label */}
        <button
          type="button"
          onClick={() => refInputDate.current?.showPicker()}
          className="flex-1 h-8 z-20 flex flex-row justify-start items-center"
        >
          <span
            className={clsx(
              "text-sm font-medium z-20",
              isValue ? "text-primary-black" : "text-primary-black/50",
            )}
          >
            {isValue ? isValue : "Masukan tanggal"}
          </span>
        </button>
      </div>
      {/* error message */}
      <ErrorMessageInput errorMessage={fieldState.error?.message} />
    </div>
  );
}

export default BoxInputDate;
