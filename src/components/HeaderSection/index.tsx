import type { FC } from "react";
import Subjudul from "../SubJudul";

// Props
interface Props {
  judul: string;
  ket: string;
  mb?: number;
}

const HeaderSection: FC<Props> = ({ judul, ket, mb }) => {
  return (
    <div
      className={`w-screen justify-center items-center flex flex-col mb-${
        mb || 6
      }`}
    >
      <Subjudul text={judul} />
      <p className="text-sm font-poppins font-normal text-secondary-blue py-5 px-12 rounded-xl text-center md:text-xl lg:text-base lg:px-52">
        {ket}
      </p>
    </div>
  );
};

export default HeaderSection;
