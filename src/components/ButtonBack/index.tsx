import { type FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  link: string;
};
const ButtonBack: FC<Props> = ({ link }) => {
  return (
    <Link
      to={link}
      className="w-full h-11 bg-gray-400 text-white text-center rounded-lg hover:bg-gray-500 transition-all duration-200 ease-in-out flex flex-row justify-center items-center"
    >
      Kembali
    </Link>
  );
};

export default ButtonBack;
