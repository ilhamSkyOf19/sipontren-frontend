import clsx from "clsx";
import { type FC, type ReactNode } from "react";

type Props = {
  color: string;
  icon: ReactNode;
  handleClick: () => void;
  label: string;
};

const ButtonAction: FC<Props> = ({ handleClick, color, icon, label }) => {
  return (
    <button
      onClick={() => handleClick()}
      type="button"
      className={clsx(
        "rounded-lg transition-all duration-200 ease-in-out lg:w-full flex flex-row justify-center items-center relative before:content-[''] before:inset-0 before:absolute before:bg-primary-black/30 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:ease-in-out before:duration-200 overflow-hidden",
        color,
      )}
    >
      <div className="py-2.5 px-6 lg:hidden">{icon}</div>
      <p className="text-sm hidden lg:flex py-2.5 text-primary-white font-medium capitalize text-center">
        {label}
      </p>
    </button>
  );
};

export default ButtonAction;
