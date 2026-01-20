import clsx from "clsx";
import { ChevronDown, UsersRound } from "lucide-react";
import { type FC, type RefObject } from "react";

type Props = {
  refButtonJenisKelamin: RefObject<HTMLButtonElement | null>;
  refModalJenisKelamin: RefObject<HTMLDivElement | null>;
  handleButtonJenisKelamin: () => void;
  handleJenisKelamin: (value: "laki_laki" | "perempuan" | undefined) => void;
  isModalJenisKelamin: {
    active: boolean;
    jenisKelamin: "laki_laki" | "perempuan" | undefined;
  };
};

const FilterJenisKelamin: FC<Props> = ({
  handleButtonJenisKelamin,
  handleJenisKelamin,
  isModalJenisKelamin,
  refButtonJenisKelamin,
  refModalJenisKelamin,
}) => {
  return (
    <>
      <button
        ref={refButtonJenisKelamin}
        onClick={() => handleButtonJenisKelamin()}
        type="button"
        className="px-4 h-full flex flex-row justify-start items-center bg-white shadow-[0_2px_10px_1px_rgba(0,0,0,0.05)] rounded-lg gap-2"
      >
        <UsersRound size={24} />
        <span className="text-sm font-medium text-left hidden lg:block">
          {isModalJenisKelamin.jenisKelamin
            ? isModalJenisKelamin.jenisKelamin === "laki_laki"
              ? "Laki-laki"
              : "Perempuan"
            : "Jenis Kelamin"}
        </span>

        <ChevronDown
          size={24}
          className={clsx(
            "transition-transform duration-200 ease-in-out",
            isModalJenisKelamin.active ? "-rotate-180" : "rotate-0",
          )}
        />
      </button>

      {/* modal jenis kelamin */}
      <div
        ref={refModalJenisKelamin}
        className={clsx(
          " w-[40vw] bg-white shadow-[0_0_20px_2px_rgba(0,0,0,0.1)] flex flex-col justify-start items-start absolute top-[110%] z-40 rounded-md transition-all duration-300 ease-in-out overflow-hidden overflow-y-scroll scrollbar-hidden md:w-40",
          isModalJenisKelamin.active ? "max-h-43" : "max-h-0 shadow-none",
        )}
      >
        {/* choose laki laki */}
        <button
          type="button"
          onClick={() => handleJenisKelamin("laki_laki")}
          className={clsx(
            "w-full flex flex-row justify-start items-center gap-2 px-4 py-3 hover:bg-primary-black/10 transition-all duration-200 ease-in-out",
            isModalJenisKelamin.jenisKelamin === "laki_laki" &&
              "bg-primary-black/10",
          )}
        >
          <span className="text-sm font-medium w-full text-center">
            Laki-laki
          </span>
        </button>

        {/* choose perempuan */}
        <button
          type="button"
          onClick={() => handleJenisKelamin("perempuan")}
          className={clsx(
            "w-full flex flex-row justify-start items-center gap-2 px-4 py-3 hover:bg-primary-black/10 transition-all duration-200 ease-in-out",
            isModalJenisKelamin.jenisKelamin === "perempuan" &&
              "bg-primary-black/10",
          )}
        >
          <span className="text-sm font-medium w-full text-center">
            Perempuan
          </span>
        </button>

        {/* choose reset */}
        <button
          type="button"
          onClick={() => handleJenisKelamin(undefined)}
          className="w-full flex flex-row justify-start items-center gap-2 px-4 py-3 hover:bg-primary-black/10 transition-all duration-200 ease-in-out"
        >
          <span className="text-sm font-medium w-full text-center">Reset</span>
        </button>
      </div>
    </>
  );
};

export default FilterJenisKelamin;
