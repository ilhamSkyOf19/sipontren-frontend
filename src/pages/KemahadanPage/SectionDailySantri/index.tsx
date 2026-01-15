import SubJudulCenter from "../../../components/SubJudulCenter";
import pamflet from "../../../assets/pamflet/pamflet-4.jpg";
import type { FC } from "react";

const DailySantri: FC = () => {
  return (
    <div className="w-full py-12">
      <div className="w-full flex flex-col justify-start items-center px-2 gap-16 md:px-10">
        <div className="flex justify-center items-center w-full lg:w-[60%]">
          <SubJudulCenter
            title={
              "Daily Santri Pondok Pesantren Muhammadiyah Al-Amin Seputih Banyak - Lampung Tengah"
            }
          />
        </div>
        <div className="w-full px-3 lg:w-[45%]">
          <img src={pamflet} alt="" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default DailySantri;
