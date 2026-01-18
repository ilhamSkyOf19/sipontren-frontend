import { type FC } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  linkAdd: string;
};
const ButtonAddText: FC<Props> = ({ linkAdd }) => {
  // navigate
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => {
        navigate(linkAdd, {
          state: {
            from: "state",
          },
        });
      }}
      className="px-6 py-2.5 capitalize rounded-lg bg-primary-green text-primary-white font-medium text-base relative before:absolute before:content-[''] before:inset-0 before:bg-primary-black/10 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-200 before:ease-in-out"
    >
      tambah
    </button>
  );
};

export default ButtonAddText;
