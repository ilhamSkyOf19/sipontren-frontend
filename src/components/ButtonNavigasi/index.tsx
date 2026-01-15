import clsx from "clsx";
import type { FC } from "react";
import { Link } from "react-router-dom";

// Props
type Props = {
  label: string;
  url: string;
  active: boolean;
};

const ButtonNavigasi: FC<Props> = ({ label, url, active }) => {
  return (
    <Link
      to={`${url}`}
      className={clsx(
        "text-sm font-medium w-full text-left pl-7 cursor-pointer font-poppins py-4 hover:bg-primary-yellow active:bg-primary-yellow md:text-lg md:pl-10 md:py-5",
        active
          ? "bg-primary-yellow text-primary-blue"
          : "bg-transparent text-white"
      )}
    >
      {label}
    </Link>
  );
};

export default ButtonNavigasi;
