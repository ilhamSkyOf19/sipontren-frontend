import type { FC } from "react";

type Props = {
  img: string;
  nama: string;
  angkatan: string;
  deskripsi: string;
};

const CardAlumni: FC<Props> = ({ img, nama, angkatan, deskripsi }) => {
  return (
    <div className="w-full h-[30vh] flex flex-row justify-between items-center shrink-0 rounded-2xl overflow-hidden shadow-[0px_0px_7px_0px_rgba(0,0,0,0.25)] md:w-[85%] md:h-[38vh] lg:w-[35vw] lg:h-[40vh]">
      <div className="w-[45%] h-full rounded-2xl lg:w-[40%] overflow-hidden group">
        <img
          src={`${import.meta.env.VITE_API_BASE_IMG_URL}/img_alumni/${img}`}
          alt="logo sipontren"
          className="w-full h-full object-cover group-hover:transition-transform group-hover:scale-110 transition-transform duration-300 ease-in-out"
          loading="lazy"
        />
      </div>
      <div className="w-[55%] h-full flex flex-col justify-start items-start px-4 gap-5 pt-3 bg-white md:pt-8 lg:pt-2 lg:w-[60%]">
        <div className="flex flex-col justify-start items-start gap-1 ">
          <p className="text-sm font-semibold md:text-2xl lg:text-lg capitalize">
            {nama}
          </p>
          <p className="text-xs md:text-xl lg:text-sm">Angkatan {angkatan}</p>
        </div>
        <p className="text-[0.65rem] md:text-lg lg:text-sm">{deskripsi}</p>
      </div>
    </div>
  );
};

export default CardAlumni;
