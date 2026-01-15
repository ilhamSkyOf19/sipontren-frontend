// img
import clsx from "clsx";
import type { FC } from "react";
import gedung from "../../assets/fasilitas/masjid.png";

// Props
type Props = {
  img: string;
  nama: string;
  deskripsi: string;
};

const CardFasilitas: FC<Props> = ({ img, nama, deskripsi }) => {
  return (
    <div className="w-[70%] h-[32vh] bg-white rounded-xl shadow-xl flex flex-col justify-between items-center overflow-hidden shrink-0 md:w-[70%] md:h-100 lg:w-xs lg:h-80">
      <div
        className={clsx(
          `w-full h-[55%] flex flex-row justify-center items-center bg-contain overflow-hidden relative group`,
          img === "default.png" && "bg-primary-blue"
        )}
      >
        <div
          className={clsx(
            "absolute -bottom-2",
            img === "default.png" ? "w-[85%]" : "w-full"
          )}
        >
          <img
            src={
              img === "default.png"
                ? gedung
                : `${import.meta.env.VITE_API_BASE_IMG_URL}/fasilitas/${img}`
            }
            alt="bangunan"
            className={clsx(
              "w-full h-full group-hover:scale-110 transition-transform duration-300 ease-in-out object-cover",
              img === "default.png" ? "object-contain" : "object-cover"
            )}
            loading="lazy"
          />
        </div>
      </div>
      <div className="w-full h-[45%] flex flex-col py-2 justify-between items-start px-4 gap-1 md:pt-3">
        <div className="w-full h-full flex flex-col justify-start items-start gap-1">
          <p className="text-sm font-semibold md:text-xl lg:text-lg text-primary-blue">
            <span className="text-primary-yellow">
              {nama.split(" ")[0]} {""}
            </span>

            {nama.split(" ").slice(1).join(" ")}
          </p>
          <p className="text-xs md:text-[1.1rem] lg:text-sm">{deskripsi}</p>
        </div>
      </div>
    </div>
  );
};

export default CardFasilitas;
