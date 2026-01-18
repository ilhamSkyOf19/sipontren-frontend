import { type FC } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  linkUpdate: string;
  from: string;
};
const ButtonEditText: FC<Props> = ({ linkUpdate, from }) => {
  // navigate
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(linkUpdate, {
          state: {
            from,
          },
        });
      }}
      type="button"
      className="w-full flex flex-row justify-center items-center bg-secondary-blue hover:bg-primary-blue transition-all ease-in-out duration-200 py-1.5 px-4 rounded-lg"
    >
      <span className="text-sm font-medium text-white capitalize">edit</span>
    </button>
  );
};

export default ButtonEditText;
