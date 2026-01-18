import { useRef, useState, type ChangeEvent } from "react";
import type { FieldValues, UseControllerReturn } from "react-hook-form";
import clsx from "clsx";
import ErrorMessageInput from "../ErrorMessageInput";
import { Trash } from "lucide-react";

type Props<T extends FieldValues = any> = {
  label: string;
  required: boolean;
  controller: UseControllerReturn<T>;
  clearError?: () => void;
  fullPreview?: boolean;
};

function BoxInputGambar<TFieldValues extends FieldValues = any>({
  controller,
  label,
  required,
  clearError,
  fullPreview,
}: Props<TFieldValues>) {
  // state value
  const [isPreview, setIsPreview] = useState<string>("");

  // field
  const { field, fieldState } = controller;

  // ref input
  const refInput = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // get files
    const file = e.target.files?.[0];

    // cek files
    if (file) {
      // set preview
      setIsPreview(URL.createObjectURL(file));

      // set value
      field.onChange(file);

      //   clear error
      clearError?.();
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-start">
      {/* label */}
      <label htmlFor="name" className="text-base relative">
        {label} <span className="text-sm">(dokumen maksimal 2MB)</span>
        <span className="absolute -top-1 ml-1 text-primary-red">
          {required && "*"}
        </span>
      </label>

      <button
        type="button"
        onClick={() => {
          refInput.current?.click();
        }}
        className={clsx(
          "px-6 py-1 h-11 bg-secondary-blue rounded-lg mt-2 relative focus-within:shadow-[0_4px_6px_0_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out hover:bg-primary-blue gap-3",
          fieldState.error?.message && "border-primary-red",
        )}
      >
        {/* label */}
        <span className="text-sm text-white w-full h-full text-center">
          {label}
        </span>
        {/* input */}
        <input
          type="file"
          ref={refInput}
          accept="image/*"
          hidden={true}
          onChange={handleChange}
        />
      </button>

      {/* preview */}
      <div
        className={clsx(
          "w-full flex flex-col justify-start items-start gap-1",
          isPreview ? "my-6" : "mt-2",
        )}
      >
        {isPreview ? (
          <div
            className={clsx(
              "w-full flex justify-start items-center",
              fullPreview ? "flex-col gap-2" : "flex-row gap-8",
            )}
          >
            {/* preview */}
            <img
              src={isPreview}
              alt="preview"
              className={clsx(
                " object-cover rounded-2xl",
                fullPreview ? "w-full h-40 lg:h-60" : "w-55 h-60",
              )}
            />

            {/* button reset */}
            <div
              className={clsx(
                "flex flex-row items-center h-full",
                fullPreview ? "w-full justify-end " : "justify-start",
              )}
            >
              <button
                type="button"
                className="w-12 h-12 bg-primary-red rounded-full flex flex-row justify-center items-center relative overflow-hidden before:absolute before:content-[''] before:inset-0 before:bg-primary-black/20 before:opacity-0 before:transition-all before:duration-200 before:ease-in-out hover:before:opacity-100"
                onClick={() => {
                  setIsPreview("");
                  field.onChange(null);
                }}
              >
                <Trash size={24} className="text-primary-white" />
              </button>
            </div>
          </div>
        ) : (
          !fieldState.error?.message && (
            <span className="text-sm">Silahkan upload gambar</span>
          )
        )}
      </div>
      {/* error message */}
      <ErrorMessageInput errorMessage={fieldState.error?.message} />
    </div>
  );
}

export default BoxInputGambar;
