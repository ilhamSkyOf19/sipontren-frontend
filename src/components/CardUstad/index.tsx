import type { FC } from "react";

// Props
type Props = {
  img: string;
  nama: string;
  jabatan: string;
};

const CardUstad: FC<Props> = ({ img, nama, jabatan }) => {
  return (
    <div className="w-48 h-[40vh] flex flex-col justify-start items-center shrink-0 rounded-2xl overflow-hidden shadow-[0px_0px_7px_0px_rgba(0,0,0,0.25)] md:w-76 md:h-[40vh] lg:w-50 lg:h-[43vh]">
      <div className="flex-4 w-full overflow-hidden group">
        <img
          src={`${import.meta.env.VITE_API_BASE_IMG_URL}/ustad_img/${img}`}
          alt="image ustad"
          className="w-full h-full object-cover group-hover:transition-transform group-hover:scale-102 transition-transform duration-300 ease-in-out"
        />
      </div>
      <div className="flex-2 w-full flex flex-col justify-start items-center px-4 gap-2 pt-2 md:px-10 bg-white md:pt-3 lg:px-2">
        <p className="text-xs text-center font-semibold md:text-xl lg:text-sm">
          {nama}
        </p>
        <p className="text-xs text-center md:text-[1.1rem] lg:text-xs py-1.5 px-2 bg-secondary-blue text-white rounded-md">
          {jabatan}
        </p>
      </div>
    </div>
  );
};

export default CardUstad;
