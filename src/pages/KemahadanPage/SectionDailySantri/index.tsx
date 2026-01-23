import SubJudulCenter from "../../../components/SubJudulCenter";
import type { FC } from "react";
import ParallaxGoTop from "../../../fragments/ParallaxGoTop";
import { useQuery } from "@tanstack/react-query";
import { PamfletService } from "../../../services/pamflet.service";
import NoData from "../../../components/NoData";

const DailySantri: FC = () => {
  // get data
  const { data: dataPamflet, isLoading } = useQuery({
    queryKey: ["pamfletUser"],
    queryFn: () => PamfletService.read(),
  });

  return (
    <section className="w-full py-12">
      <div className="w-full flex flex-col justify-start items-center px-2 gap-16 md:px-10">
        <div className="flex justify-center items-center w-full lg:w-[60%]">
          <SubJudulCenter
            title={
              "Daily Santri Pondok Pesantren Muhammadiyah Al-Amin Seputih Banyak - Lampung Tengah"
            }
          />
        </div>
        {isLoading ? (
          <div className="w-full gap-4  grid grid-cols-1 justify-start items-center">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-full col-span-1 h-[50vh] bg-gray-300 animate-pulse rounded-md"
              />
            ))}
          </div>
        ) : dataPamflet?.success && dataPamflet?.data.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-start items-center w-full h-full gap-3">
            {dataPamflet.data.map((item) => (
              <div key={item.id} className="col-span-1 px-3">
                <ParallaxGoTop>
                  <img
                    src={`${import.meta.env.VITE_API_BASE_IMG_URL}/pamflet/${item.pamflet}`}
                    alt=""
                    loading="lazy"
                  />
                </ParallaxGoTop>
              </div>
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </section>
  );
};

export default DailySantri;
