import { memo, type FC } from "react";
import HeaderSection from "../../../components/HeaderSection";

const SectionLayananPendidikan: FC = memo(() => {
  return (
    <div className="w-full flex flex-col justify-start items-center pt-16 gap-12">
      <HeaderSection
        judul={"Layanan Pendidikan"}
        ket={
          "Pilihan Pendidikan Berkualitas Pondok Pesantren Modern, Sekolah Menengah Pertama, dan Sekolah Menengah Atas Kami Hadir Untuk Mendukung Masa Depan Cemerlang Anda"
        }
      />
      <div
        className={`
      w-screen flex flex-col justify-center items-center gap-7
      md:flex-row flex-wrap lg:px-16
      `}
      >
        <CardLayanan
          textOne={"Pondok Pesantren"}
          textTwo={"Modern"}
          textKet={
            "Pondok Pesantren Muhammadiyah Al-Amin seputih Banyak - Lampung tengah"
          }
        />
        <CardLayanan
          textOne={"Sekolah Menengah"}
          textTwo={"Pertama"}
          textKet={"SMP Muhammadiyah Al-Amin seputih Banyak - Lampung tengah"}
        />
        <CardLayanan
          textOne={"Sekolah Menengah"}
          textTwo={"Atas"}
          textKet={"SMA Muhammadiyah Al-Amin seputih Banyak - Lampung tengah"}
        />
      </div>
    </div>
  );
});

// card layanan
type CardLayananProps = {
  textOne: string;
  textTwo: string;
  textKet: string;
};
const CardLayanan: FC<CardLayananProps> = ({ textOne, textTwo, textKet }) => {
  return (
    <div className="flex flex-col justify-start items-center w-[80%] min-h-[23vh] bg-primary-blue rounded-xl py-8 md:w-[45%] md:justify-start md:gap-2 lg:flex-1/4 lg:hover:bg-secondary-blue transition-all ease-in-out duration-200 shadow-md inset-shadow-2xs hover:shadow-secondary-blue lg:h-[34vh] lg:gap-0 lg:justify-center">
      <p className="text-[1.2rem] font-normal text-white uppercase md:text-2xl lg:text-xl lg:font-semibold">
        {textOne}
      </p>
      <p className="text-[1.2rem] font-normal text-white uppercase md:text-2xl lg:text-xl lg:font-semibold">
        {textTwo}
      </p>
      <p className="text-sm text-white py-5 px-6 rounded-xl text-center md:text-[1rem] md:px-7 lg:text-base lg:py-0 lg:pt-3 lg:px-11">
        {textKet}
      </p>
    </div>
  );
};

export default SectionLayananPendidikan;
