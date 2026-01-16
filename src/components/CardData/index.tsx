import { type FC } from "react";
import { Pencil, Trash } from "lucide-react";
import clsx from "clsx";

type Props = {
  data: string[];
  dataSizeSmall: string;
  id: number;
  index: number;
  handleOpenModal: () => void;
};

const CardData: FC<Props> = ({
  data,
  id,
  index,
  handleOpenModal,
  dataSizeSmall,
}) => {
  return (
    <div
      className={clsx(
        "w-full flex flex-row justify-start items-center px-5 rounded-lg shadow-[0_6px_10px_0_rgba(0,0,0,0.05)] hover:bg-primary-black/10 transition-all duration-200 ease-in-out cursor-pointer relative h-15 bg-white gap-4 lg:gap-0"
      )}
      onClick={() => handleOpenModal()}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpenModal();
        }
      }}
    >
      <h3 className="lg:basis-[5%] flex-1 text-sm font-semibold">
        {index + 1}
      </h3>

      {/* data for dekstop */}
      <div className="basis-[90%] flex-row justify-evenly items-center hidden lg:flex">
        {data.map((item, index) => (
          <h3 key={index} className="text-sm w-full">
            {item}
          </h3>
        ))}
      </div>

      {/* data for mobile */}
      <div className="flex-12 flex-row justify-evenly items-center lg:hidden">
        <h3 className="text-sm w-full">{dataSizeSmall}</h3>
      </div>

      {/* action */}
      <div className="basis-[5%] flex-row justify-start items-center gap-1 hidden lg:flex">
        {/* update */}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          type="button"
          onKeyDown={(e) => e.stopPropagation()}
          className="w-6.5 h-6.5 flex flex-row justify-center items-center bg-primary-blue rounded-sm"
        >
          <Pencil size={14} className="text-primary-white" />
        </button>
        {/* delete */}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          onKeyDown={(e) => e.stopPropagation()}
          type="button"
          className="w-6.5 h-6.5 flex flex-row justify-center items-center bg-primary-red rounded-sm"
        >
          <Trash size={14} className="text-primary-white" />
        </button>
      </div>
    </div>
  );
};

export default CardData;
