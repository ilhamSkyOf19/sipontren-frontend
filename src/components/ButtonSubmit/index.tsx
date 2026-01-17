import { type FC } from "react";
import loadingWhite from "../../assets/animation/loading-white.svg";

type Props = {
  label: string;
  loading: boolean;
};
const ButtonSubmit: FC<Props> = ({ label, loading }) => {
  return (
    <button
      type="submit"
      className="w-full h-11 bg-secondary-blue text-white text-center rounded-lg hover:bg-primary-blue transition-all duration-200 ease-in-out flex flex-row justify-center items-center"
    >
      {loading ? (
        <img src={loadingWhite} alt="loading white" className="w-8" />
      ) : (
        label
      )}
    </button>
  );
};

export default ButtonSubmit;
