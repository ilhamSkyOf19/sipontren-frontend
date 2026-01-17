import { type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  link: string;
};
const ButtonBack: FC<Props> = ({ link }) => {
  // cek state
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => {
        if (location.state?.from) {
          navigate(-1);
        } else {
          navigate(link);
        }
      }}
      className="w-full h-11 bg-gray-400 text-white text-center rounded-lg hover:bg-gray-500 transition-all duration-200 ease-in-out flex flex-row justify-center items-center"
    >
      Kembali
    </button>
  );
};

export default ButtonBack;
