import type { FC } from "react";
import { Link } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";

// Props
type Props = {
  id: number;
  img: string;
  judul: string;
  deskripsi: string;
  jenis: "berita" | "artikel";
};
const CardBeritaSmall: FC<Props> = ({ id, img, judul, deskripsi, jenis }) => {
  // window size
  const window = useWindowSize().width;

  return (
    <div className="w-[40vw] h-[50vh] flex flex-col justify-start items-start overflow-hidden gap-4 shrink-0 md:w-68 md:h-136 md:mr-4 lg:h-104 lg:w-76 lg:gap-2">
      <div className="w-full h-32 bg-black rounded-2xl overflow-hidden shrink-0 md:h-52 lg:mb-2 lg:rounded-4xl lg:h-48 group">
        <img
          src={`${import.meta.env.VITE_API_BASE_IMG_URL}/news/${img}`}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>
      <p className="px-4 py-1 bg-white rounded-lg border border-secondary-blue text-xs md:text-[1.1rem] lg:text-xs capitalize">
        {jenis || ""}
      </p>
      <div className="flex flex-col justify-start items-start gap-3">
        <p className="w-[90%] h-14 text-sm font-normal md:text-lg md:h-20 lg:text-sm lg:h-14">
          {(judul || "").slice(
            0,
            window > 0 && window < 760
              ? 35
              : window > 760 && window < 1024
              ? 60
              : window > 1024
              ? 70
              : 60
          )}
          ...
        </p>
        <p className="w-full h-[2.7rem] text-xs text-slate-500 md:text-[1.1rem] md:h-24 lg:text-xs lg:h-14">
          {(deskripsi || "").slice(
            0,
            window > 0 && window < 760
              ? 50
              : window > 760 && window < 1024
              ? 90
              : window > 1024
              ? 100
              : 60
          )}
          ...
        </p>
      </div>
      <Link
        to={`/berita-detail/${id}`}
        className="text-xs underline cursor-pointer active:text-slate-400 md:text-lg lg:text-xs"
      >
        Baca Selengkapnya
      </Link>
    </div>
  );
};

export default CardBeritaSmall;
