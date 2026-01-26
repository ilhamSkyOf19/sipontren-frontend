import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type FC } from "react";
type Props = {
  page: number;
  handlePrev: () => void;
  handleNext: () => void;
  totalPage: number;
};
const PrevNext: FC<Props> = ({ handleNext, handlePrev, page, totalPage }) => {
  return (
    <div className="w-full flex flex-row justify-between items-center px-4 lg:mt-6">
      {/* prev */}
      <div className="flex-1 flex flex-row justify-start items-center">
        <button
          type="button"
          className={clsx(
            "py-1.5 px-4 lg:py-2 bg-secondary-blue rounded-md text-primary-white text-sm transition-all duration-200 ease-in-out hover:bg-primary-blue flex flex-row justify-start items-center gap-2",
            page === 1 && "hidden",
          )}
          onClick={() => handlePrev()}
        >
          {/* icon */}
          <ArrowLeft className="text-primary-white hidden lg:block" />

          <span>Sebelumnya</span>
        </button>
      </div>
      <div className="flex-1 flex flex-row justify-end items-center">
        <button
          type="button"
          className={clsx(
            "py-1.5 lg:py-2 px-4 bg-secondary-blue rounded-md text-primary-white text-sm transition-all duration-200 ease-in-out hover:bg-primary-blue flex flex-row justify-start items-center gap-2",
            (page === totalPage || totalPage === 1) && "hidden",
          )}
          onClick={() => handleNext()}
        >
          <span>Selanjutnya</span>

          {/* icon */}
          <ArrowRight className="text-primary-white hidden lg:block" />
        </button>
      </div>
    </div>
  );
};

export default PrevNext;
