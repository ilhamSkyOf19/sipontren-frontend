// img
import clsx from "clsx";
import type { FC } from "react";
import gedung from "../../assets/fasilitas/masjid.png";
import ButtonEditText from "../ButtonEditText";
import ButtonDeleteText from "../ButtonDeleteText";

// Props
type Props = {
  id?: number;
  img: string;
  nama: string;
  deskripsi: string;
  admin?: boolean;
  handleDelete?: () => void;
};

const CardFasilitas: FC<Props> = ({
  img,
  nama,
  deskripsi,
  admin,
  handleDelete,
  id,
}) => {
  return (
    <div
      className={clsx(
        "w-[70%] bg-white rounded-xl shadow-xl flex flex-col justify-between items-center overflow-hidden shrink-0 md:w-[70%] lg:w-xs",
        admin ? "h-70" : "h-54 lg:h-80 md:h-100 ",
      )}
    >
      <div
        className={clsx(
          `w-full h-[55%] flex flex-row justify-center items-center bg-contain overflow-hidden relative group`,
          img === "default.png" && "bg-primary-blue",
        )}
      >
        <div
          className={clsx(
            "absolute -bottom-2",
            img === "default.png" ? "w-[85%]" : "w-full",
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
              "w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out object-cover",
              img === "default.png" ? "object-contain" : "object-cover",
            )}
            loading="lazy"
          />
        </div>
      </div>
      <div className="w-full h-[45%] flex flex-col py-2 justify-between items-start px-4 gap-1 md:pt-3">
        <div className="w-full h-full flex flex-col justify-start items-start gap-1">
          <p className="text-sm font-semibold md:text-xl lg:text-lg text-secondary-blue">
            {nama}
          </p>
          <p className="text-xs md:text-[1.1rem] lg:text-sm">{deskripsi}</p>
        </div>
      </div>

      {/* action */}
      {admin && handleDelete && (
        <div className="w-full flex flex-row justify-evenly items-center mb-3 px-3 gap-3">
          {/* button delete */}
          <ButtonEditText
            linkUpdate={`/dashboard/fasilitas/edit/${id}`}
            from="fasilitas"
          />

          {/* button delete */}
          <ButtonDeleteText handleDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default CardFasilitas;
