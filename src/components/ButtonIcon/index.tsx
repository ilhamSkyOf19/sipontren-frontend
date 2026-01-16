import clsx from "clsx";
import { type FC, type ReactNode } from "react";

type Props = {
  color: string;
  icon: ReactNode;
  handleClick: () => void;
  label: string;
};

const ButtonIcon: FC<Props> = ({ handleClick, color, icon, label }) => {
  return (
    <button
      onClick={() => handleClick()}
      type="button"
      className={clsx(
        "rounded-lg transition-all duration-200 ease-in-out lg:w-full flex flex-row justify-center items-center",
        color
      )}
    >
      <div className="py-2.5 px-6 lg:hidden">{icon}</div>
      <p className="text-sm hidden lg:flex py-2.5 text-primary-white font-medium capitalize text-center">
        {label}
      </p>
    </button>
  );
};

export default ButtonIcon;
