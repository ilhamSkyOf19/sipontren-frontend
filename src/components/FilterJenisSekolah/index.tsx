import clsx from "clsx";
import { ChevronDown, School } from "lucide-react";
import { type FC, type RefObject } from "react";

// sekolah list
const sekolahList = ["SD", "SMP", "SMA"];

type Props = {
  refButtonJenisSekolah: RefObject<HTMLButtonElement | null>;
  refModalJenisSekolah: RefObject<HTMLDivElement | null>;
  handleButtonJenisSekolah: () => void;
  handleJenisSekolah: (value: "SD" | "SMP" | "SMA" | undefined) => void;
  isModalJenisSekolah: {
    active: boolean;
    jenisSekolah: "SD" | "SMP" | "SMA" | undefined;
  };
};

const FilterJenisSekolah: FC<Props> = ({
  handleButtonJenisSekolah,
  handleJenisSekolah,
  isModalJenisSekolah,
  refButtonJenisSekolah,
  refModalJenisSekolah,
}) => {
  return (
    <>
      <button
        ref={refButtonJenisSekolah}
        onClick={() => handleButtonJenisSekolah()}
        type="button"
        className="lg:px-4 px-3 h-10 lg:h-12 flex flex-row justify-start items-center bg-white shadow-[0_2px_10px_1px_rgba(0,0,0,0.05)] rounded-lg gap-2"
      >
        <School className="w-5 lg:w-7" />
        <span className="text-sm font-medium text-left hidden lg:block">
          {isModalJenisSekolah.jenisSekolah || "Jenis Sekolah"}
        </span>

        <ChevronDown
          className={clsx(
            "transition-transform duration-200 ease-in-out w-5 lg:w-7",
            isModalJenisSekolah.active ? "-rotate-180" : "rotate-0",
          )}
        />
      </button>

      {/* modal jenis kelamin */}
      <div
        ref={refModalJenisSekolah}
        className={clsx(
          " w-[40vw] bg-white shadow-[0_0_20px_2px_rgba(0,0,0,0.1)] flex flex-col justify-start items-start absolute top-[110%] z-40 rounded-md transition-all duration-300 ease-in-out overflow-hidden overflow-y-scroll scrollbar-hidden md:w-40",
          isModalJenisSekolah.active ? "max-h-43" : "max-h-0 shadow-none",
        )}
      >
        {/* choose laki laki */}
        {sekolahList.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleJenisSekolah(item as "SD" | "SMP" | "SMA")}
            className={clsx(
              "w-full flex flex-row justify-start items-center gap-2 px-4 py-3 hover:bg-primary-black/10 transition-all duration-200 ease-in-out",
              isModalJenisSekolah.jenisSekolah === item &&
                "bg-primary-black/10",
            )}
          >
            <span className="text-sm font-medium w-full text-center">
              {item}
            </span>
          </button>
        ))}

        {/* choose reset */}
        <button
          type="button"
          onClick={() => handleJenisSekolah(undefined)}
          className="w-full flex flex-row justify-start items-center gap-2 px-4 py-3 hover:bg-primary-black/10 transition-all duration-200 ease-in-out"
        >
          <span className="text-sm font-medium w-full text-center">Reset</span>
        </button>
      </div>
    </>
  );
};

export default FilterJenisSekolah;
