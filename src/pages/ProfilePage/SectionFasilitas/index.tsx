import { useQuery } from "@tanstack/react-query";
import { memo, useState, type FC } from "react";
import { FasilitasService } from "../../../services/fasilitas.service";
import SubJudulLeft from "../../../components/SubJudulLeft";
import SubJudulCenter from "../../../components/SubJudulCenter";
import ScrollXNonDesktop from "../../../layouts/ScrollXNonDesktop";
import CardFasilitas from "../../../components/CardFasilitas";
import NoData from "../../../components/NoData";
import ParallaxGoTop from "../../../fragments/ParallaxGoTop";
import PrevNext from "../../../components/PrevNext";
import ScrollXDesktop from "../../../layouts/ScrollXDesktop";

// Props
type Props = {
  widthDevice: number;
};
const SectionFasilitas: FC<Props> = ({ widthDevice }) => {
  // state page
  const [page, setPage] = useState<number>(1);

  // handle page
  const handlePage = (page: number) => {
    setPage(page);
  };

  // query fasilitas
  const { data: dataFasilitas, isLoading } = useQuery({
    queryKey: ["fasilitasForUser", page],
    queryFn: () =>
      FasilitasService.read({
        page: page.toString(),
        search: undefined,
      }),
    refetchOnWindowFocus: false,
  });

  return (
    <section className="w-full min-h-[50vh] flex flex-col justify-start items-start pt-2 pb-8 gap-10 bg-transparent lg:py-20 lg:gap-20 lg:items-center">
      <div className="w-full flex flex-row justify-start items-start lg:hidden">
        <SubJudulLeft title={"Fasilitas"} px={4} />
      </div>
      {widthDevice > 1024 && <SubJudulCenter title={"Fasilitas"} />}
      {widthDevice < 1024 ? (
        isLoading ? (
          <div className="w-full h-full flex justify-start items-start px-4 mt-12 gap-4">
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
          <ParallaxGoTop>
            <ScrollXNonDesktop gap={6}>
              {dataFasilitas.data.data.map((item, _index) => (
                <CardFasilitas
                  key={item.id}
                  img={item.images}
                  nama={item.fasilitas}
                  deskripsi={item.keterangan}
                />
              ))}
              <div className="w-1 shrink-0 h-full" />

              {/* space */}
            </ScrollXNonDesktop>

            {/* prev & next */}
            <PrevNext
              page={page}
              handlePrev={() => handlePage(page - 1)}
              handleNext={() => handlePage(page + 1)}
              totalPage={dataFasilitas.data.meta.totalPage}
            />
          </ParallaxGoTop>
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
        <ParallaxGoTop>
          <ScrollXDesktop>
            {dataFasilitas.data.data.map((item, _index) => (
              <CardFasilitas
                key={item.id}
                img={item.images}
                nama={item.fasilitas}
                deskripsi={item.keterangan}
              />
            ))}
            {/* space */}
            <div className="w-1 shrink-0 h-full" />
          </ScrollXDesktop>

          {/* prev & next */}
          <PrevNext
            page={page}
            handlePrev={() => handlePage(page - 1)}
            handleNext={() => handlePage(page + 1)}
            totalPage={dataFasilitas.data.meta.totalPage}
          />
        </ParallaxGoTop>
      ) : (
        <NoData />
      )}

      {/* space */}
      <div className="w-4 shrink-0 h-ful" />
    </section>
  );
};

export default memo(SectionFasilitas);
