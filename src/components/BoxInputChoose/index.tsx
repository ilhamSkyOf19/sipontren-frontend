import { useEffect, useRef, useState, type FC } from "react";
import type { FieldValues, UseControllerReturn } from "react-hook-form";
import useClickOutside from "../../hooks/useClickOutSide";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import ErrorMessageInput from "../ErrorMessageInput";

type Props<T extends FieldValues = any> = {
  label: string;
  chooseList: string[];
  required: boolean;
  controller: UseControllerReturn<T>;
  defaultValue?: string;
  hAuto?: boolean;
};

export default function BoxInputChoose<T extends FieldValues = any>({
  chooseList,
  controller,
  defaultValue,
  label,
  hAuto,
}: Props<T>) {
  // state choose angkatan
  const [value, setValue] = useState<string>("");
  // state modal choose
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  //   ref modal
  const modalRef = useRef<HTMLDivElement>(null);

  //   ref button
  const buttonRef = useRef<HTMLButtonElement>(null);

  //   use click outside
  useClickOutside({
    refs: [modalRef, buttonRef],
    onOutsideClick: () => setIsOpenModal(false),
  });

  // set value if default values is existing
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  // field
  const { field, fieldState } = controller;

  return (
    <div className="w-full flex flex-col justify-start items-start relative">
      {/* label */}
      <label htmlFor="name" className="text-base relative">
        {label}
        <span className="absolute -top-1 ml-1 text-primary-red">*</span>
      </label>

      <div
        className={clsx(
          "w-full px-4 py-1 h-11 border border-secondary-blue rounded-lg mt-2 focus-within:shadow-[0_4px_6px_0_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out focus-within:-translate-y-1 relative",
          fieldState.error && "border-primary-red",
        )}
      >
        <input
          type="text"
          name="angkatan"
          id="angkatan"
          value={
            value === "laki_laki"
              ? "Laki-laki"
              : value === "perempuan"
                ? "Perempuan"
                : value
          }
          placeholder="Masukan angkatan alumni ..."
          className="w-full h-full border-none outline-none text-base placeholder:text-sm"
          readOnly
        />

        {/* button down */}
        <button
          ref={buttonRef}
          type="button"
          className="absolute inset-0 flex flex-row justify-end items-center cursor-pointer pr-3"
          onClick={() => {
            setIsOpenModal((prev) => !prev);
          }}
        >
          <ChevronDown
            size={24}
            className={clsx("text-secondary-blue", isOpenModal && "rotate-180")}
          />
        </button>
      </div>

      {/* modal choose angkatan */}
      <div
        ref={modalRef}
        className={clsx(
          "absolute top-19 right-2 left-2 rounded-md flex flex-col justify-start items-start bg-white shadow-[0_0_10px_1px_rgba(0,0,0,0.1)] z-10 overflow-hidden overflow-y-auto transition-all duration-300 ease-in-out",
          hAuto ? "h-auto" : "h-50",
          isOpenModal ? "max-h-50" : "max-h-0",
        )}
      >
        {chooseList.map((item, index) => (
          <ButtonChooseAngkatan
            key={index}
            label={
              item === "laki_laki"
                ? "Laki-laki"
                : item === "perempuan"
                  ? "Perempuan"
                  : item
            }
            handleClick={() => {
              field.onChange(item);
              setValue(item);
              setIsOpenModal(false);
            }}
            active={field.value === item}
          />
        ))}
      </div>

      {/* error message */}
      <ErrorMessageInput errorMessage={fieldState.error?.message} />
    </div>
  );
}

// button choose angkatan
type ButtonChooseAngkatanProps = {
  label: string;
  handleClick: () => void;
  active: boolean;
};
const ButtonChooseAngkatan: FC<ButtonChooseAngkatanProps> = ({
  handleClick,
  label,
  active,
}) => {
  return (
    <button
      type="button"
      className={clsx(
        "w-full py-3 px-4 hover:bg-primary-black/10 transition-all duration-200 ease-in-out text-left",
        active && "bg-primary-black/10",
      )}
      onClick={() => handleClick()}
    >
      {label}
    </button>
  );
};
