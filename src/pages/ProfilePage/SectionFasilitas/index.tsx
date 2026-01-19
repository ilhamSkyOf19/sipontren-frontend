import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { FasilitasService } from "../../../services/fasilitas.service";
import SubJudulLeft from "../../../components/SubJudulLeft";
import SubJudulCenter from "../../../components/SubJudulCenter";
import ScrollXNonDesktop from "../../../layouts/ScrollXNonDesktop";
import CardFasilitas from "../../../components/CardFasilitas";
import NoData from "../../../components/NoData";
import ParallaxGoTop from "../../../fragments/ParallaxGoTop";

// Props
type Props = {
  widthDevice: number;
};
const SectionFasilitas: FC<Props> = ({ widthDevice }) => {
  // query fasilitas
  const { data: dataFasilitas, isLoading } = useQuery({
    queryKey: ["fasilitasForUser"],
    queryFn: () =>
      FasilitasService.read({
        page: undefined,
        search: undefined,
      }),
  });

  return (
    <div className="w-full min-h-[50vh] flex flex-col justify-start items-start pt-2 pb-8 gap-10 bg-transparent lg:py-20 lg:gap-20 lg:items-center">
      <ParallaxGoTop>
        <div className="w-full flex flex-row justify-start items-start lg:hidden">
          <SubJudulLeft title={"Fasilitas"} px={4} />
        </div>
        {widthDevice > 1024 && <SubJudulCenter title={"Fasilitas"} />}
        {widthDevice < 1024 ? (
          isLoading ? (
            <div className="w-full h-full flex justify-start items-start px-4 gap-4">
              {/* loading skeleton */}
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="w-[70%] bg-gray-300 animate-pulse rounded-xl flex flex-col justify-between items-center overflow-hidden shrink-0 md:w-[70%] lg:w-xs h-54 lg:h-80 md:h-100"
                />
              ))}
            </div>
          ) : dataFasilitas?.success &&
            dataFasilitas.data &&
            dataFasilitas.data.data.length > 0 ? (
            <ScrollXNonDesktop gap={6}>
              {dataFasilitas.data.data.map((item, _index) => (
                <CardFasilitas
                  key={item.id}
                  img={item.images}
                  nama={item.fasilitas}
                  deskripsi={item.keterangan}
                />
              ))}
            </ScrollXNonDesktop>
          ) : (
            <NoData />
          )
        ) : isLoading ? (
          <div className="w-full h-full flex justify-start items-start px-4 gap-4">
            {/* loading skeleton */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="w-[70%] bg-gray-300 animate-pulse rounded-xl flex flex-col justify-between items-center overflow-hidden shrink-0 md:w-[70%] lg:w-xs h-54 lg:h-80 md:h-100"
              />
            ))}
          </div>
        ) : dataFasilitas?.success &&
          dataFasilitas.data &&
          dataFasilitas.data.data.length > 0 ? (
          <ScrollXNonDesktop>
            {dataFasilitas.data.data.map((item, _index) => (
              <CardFasilitas
                key={item.id}
                img={item.images}
                nama={item.fasilitas}
                deskripsi={item.keterangan}
              />
            ))}
          </ScrollXNonDesktop>
        ) : (
          <NoData />
        )}

        {/* space */}
        <div className="w-4 shrink-0 h-ful" />
      </ParallaxGoTop>
    </div>
  );
};

export default SectionFasilitas;
