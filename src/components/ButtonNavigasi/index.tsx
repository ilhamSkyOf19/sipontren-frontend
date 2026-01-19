import clsx from "clsx";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

// Props
type Props = {
  label: string;
  url: string;
  active: boolean;
  handleClose: () => void;
};

const ButtonNavigasi: FC<Props> = ({ label, url, active, handleClose }) => {
  // navigate
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => {
        navigate(url);
        handleClose();
      }}
      className={clsx(
        "text-sm font-semibold w-full text-left pl-7 cursor-pointer font-poppins py-4 hover:bg-primary-yellow active:bg-primary-yellow md:text-lg md:pl-10 md:py-5",
        active
          ? "bg-primary-yellow text-primary-white"
          : "bg-transparent text-primary-white",
      )}
    >
      {label}
    </button>
  );
};

export default ButtonNavigasi;
