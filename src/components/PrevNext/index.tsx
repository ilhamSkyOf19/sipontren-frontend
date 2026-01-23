import clsx from "clsx";
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
            "py-1.5 px-4 bg-secondary-blue rounded-md text-primary-white text-sm transition-all duration-200 ease-in-out hover:bg-primary-blue",
            page === 1 && "hidden",
          )}
          onClick={() => handlePrev()}
        >
          Sebelumnya
        </button>
      </div>
      <div className="flex-1 flex flex-row justify-end items-center">
        <button
          type="button"
          className={clsx(
            "py-1.5 px-4 bg-secondary-blue rounded-md text-primary-white text-sm transition-all duration-200 ease-in-out hover:bg-primary-blue",
            (page === totalPage || totalPage === 1) && "hidden",
          )}
          onClick={() => handleNext()}
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
};

export default PrevNext;
