import type { FC, RefObject } from "react";
import { formatDateNumber, getTodayLocal } from "../../utils/utils";
import { Calendar } from "lucide-react";

type Props = {
  type: "from" | "to";
  refInput: RefObject<HTMLInputElement | null>;
  handleDate: (type: "from" | "to", date: string) => void;
  label: string;
  to?: string;
  from?: string;
  noMax?: boolean;
};
const BoxInputDateFilter: FC<Props> = ({
  handleDate,
  label,
  refInput,
  type,
  to,
  from,
  noMax,
}) => {
  return (
    <button
      type="button"
      onClick={() => refInput.current?.showPicker()}
      className="w-full flex flex-col justify-start items-start gap-1"
    >
      <span className="flex-1 font-medium text-xs capitalize">
        {type === "from" ? "dari" : "sampai"}
      </span>
      {/* input date */}
      <div className="w-full h-8 border border-primary-blue flex items-center px-2 gap-2 py-5 rounded-sm relative">
        <input
          ref={refInput}
          type="date"
          className="absolute opacity-0"
          onChange={(e) => {
            const value = e.target.value;
            if (!value) return;
            handleDate(type, getTodayLocal(new Date(value)));
          }}
          max={to ? to : noMax ? "" : getTodayLocal()}
          min={from && from}
        />

        {/* icon */}
        <div className="z-20">
          <Calendar size={18} />
        </div>

        {/* label */}
        <div className="flex-1 h-8 z-20 flex flex-row justify-start items-center">
          <span className="text-xs font-medium z-20">
            {formatDateNumber(label ? new Date(label) : new Date())}
          </span>
        </div>
      </div>
    </button>
  );
};

// export
export default BoxInputDateFilter;
