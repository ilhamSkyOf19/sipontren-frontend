import { type FC } from "react";

type Props = {
  handleDelete: () => void;
};
const ButtonDeleteText: FC<Props> = ({ handleDelete }) => {
  return (
    <button
      onClick={() => handleDelete()}
      type="button"
      className="w-full bg-primary-red flex flex-row justify-center items-center relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-primary-black/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:ease-in-out before:duration-200 py-1.5 px-4 rounded-lg"
    >
      <span className="text-sm font-medium text-white capitalize">delete</span>
    </button>
  );
};

export default ButtonDeleteText;
