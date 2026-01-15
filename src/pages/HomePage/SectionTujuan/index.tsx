import { memo, type FC } from "react";

const SectionTujuan: FC = memo(() => {
  return (
    <div className="w-screen flex flex-col justify-center items-center py-20 overflow-hidden lg:flex-row lg:pr-12 lg:min-h-[30vh]">
      <div className="flex flex-col justify-center items-center lg:w-[60%] lg:justify-center lg:items-center lg:px-11">
        <h2 className="text-4xl font-bold text-primary-blue py-5 md:text-[2.5rem] lg:text-3xl text-center">
          Tujuan
        </h2>
        <p className="text-base text-black text-center px-11 mb-12 md:text-xl lg:text-center lg:px-0 relative leading-14">
          Terselenggaranya{" "}
          <span className="bg-primary-blue text-white px-2 py-1 rounded">
            lembaga pendidikan Muhammadiyah yang berkualitas
          </span>
          dalam membentuk{" "}
          <span className="bg-primary-blue text-white px-2 py-1 rounded">
            kader utama
          </span>
          ,
          <span className="bg-primary-blue text-white px-2 py-1 rounded">
            pemimpin
          </span>
          , dan
          <span className="bg-primary-blue text-white px-2 py-1 rounded">
            pendidik
          </span>
          yang mendukung gerak langkah dan tujuan Muhammadiyah
        </p>
      </div>
    </div>
  );
});

export default SectionTujuan;
