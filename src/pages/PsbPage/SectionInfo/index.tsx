import { Link } from "react-router-dom";
import thumbnailProfile from "../../../assets/thumbnails/thumbnail_profile.png";
import { memo, type FC } from "react";
import IconArab from "../../../components/IconArab";

type Props = {
  width: number;
};

const SectionInfo: FC<Props> = memo(({ width }) => {
  return (
    <div className="flex flex-col justify-start items-center w-[98%] min-h-[90vh] pt-28 pb-12 bg-primary-blue gap-2 overflow-hidden md:pt-32 lg:flex-row lg:pt-12 lg:pb-0 lg:items-end  lg:h-[80vh] mb-4 rounded-xl">
      <div className="flex-1 flex flex-col justify-center items-center w-screen gap-3 md:gap-6 lg:items-start lg:pl-8 lg:gap-2 lg:min-h-full">
        <IconArab
          width={width < 700 ? "25%" : width > 1024 ? "24%" : "20%"}
          position={width > 1024 ? "start" : "center"}
        />
        <div className="flex flex-col justify-center items-center w-full gap-2 mb-3 lg:items-start lg:mb-1 lg:mt-2 lg:gap-0">
          <p className="text-md font-roboto weight-[100] text-white md:text-2xl lg:text-sm">
            Update Informasi Terkait
          </p>
          <p className="text-xl text-white font-semibold md:text-3xl lg:text-[2.8rem]">
            PENERIMAAN SANTRI BARU
          </p>
          <p className="text-xl text-white font-semibold md:text-3xl lg:text-[2.8rem]">
            TAHUN AJARAN 2025/2026
          </p>
        </div>
        <p className="text-lg font-poppins font-semibold text-white bg-primary-yellow py-2 px-5 text-center rounded-sm mb-8 md:text-2xl md:py-4 md:px-10 lg:text-xl lg:py-2 lg:px-14 lg:mb-6">
          Jenjang SMP/SMA
        </p>
        {width > 1024 && (
          <div className="flex flex-row justify-between items-center gap-1 border border-white rounded-lg">
            <Link
              to={"/formulir"}
              className="text-xs rounded-lg border-white border-r bg-white text-bg-primary-blue py-2.5 px-9 cursor-pointer hover:bg-primary-blue hover:text-white transition-all ease-in-out duration-300 font-semibold text-primary-blue"
            >
              Daftar Sekarang
            </Link>
            <p className="text-xs py-2.5 px-7 text-white font-semibold">
              psb.pontrenmualamin
            </p>
          </div>
        )}
      </div>
      <div className="w-[90%] h-px bg-white lg:hidden"></div>
      <div className="flex-1 flex flex-col justify-center items-center w-screen lg:justify-end lg:items-start">
        <img
          src={thumbnailProfile}
          alt="thumbnail profile"
          className="w-100 md:w-lg lg:w-140"
          loading="lazy"
        />

        <Link
          to={"/formulir"}
          className="text-xl font-poppins font-semibold bg-slate-100 py-2 px-14 text-center rounded-lg text-primary-blue hover:scale-110 transition ease-in-out duration-200 md:text-2xl md:py-3 md:px-20 lg:hidden"
        >
          Daftar Sekarang
        </Link>
      </div>
    </div>
  );
});

export default SectionInfo;
