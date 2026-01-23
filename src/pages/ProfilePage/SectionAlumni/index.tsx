import { memo, useState, type FC } from "react";
import { AlumniService } from "../../../services/alumni.service";
import { useQuery } from "@tanstack/react-query";
import SubJudulCenter from "../../../components/SubJudulCenter";
import ScrollXNonDesktop from "../../../layouts/ScrollXNonDesktop";
import CardAlumni from "../../../components/CardAlumni";
import NoData from "../../../components/NoData";
import ScrollXDesktop from "../../../layouts/ScrollXDesktop";
import ParallaxGoTop from "../../../fragments/ParallaxGoTop";
import PrevNext from "../../../components/PrevNext";
import useWindowSize from "../../../hooks/useWindowSize";

const SectionAlumni: FC = () => {
  // Window Size
  const widthDevice = useWindowSize().width;

  // state page
  const [page, setPage] = useState<number>(1);

  // handle page
  const handlePage = (page: number) => {
    setPage(page);
  };

  // use query
  const { data, isLoading } = useQuery({
    queryKey: ["alumniForUSer", page],
    queryFn: () =>
      AlumniService.read({
        page: page.toString(),
        search: undefined,
      }),
    refetchOnWindowFocus: false,
  });

  return (
    <section className="w-full min-h-[40vh] bg-transparent flex flex-col justify-start items-center py-12 gap-14">
      <SubJudulCenter title="Apa Kata Lulusan" />
      {widthDevice < 1024 ? (
        isLoading ? (
          <div className="w-full flex flex-row justify-start items-start gap-4 px-4 mt-12">
            {Array.from({ length: 1 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-[30vh] bg-gray-300 animate-pulse flex flex-row justify-between items-center shrink-0 rounded-2xl overflow-hidden md:w-[85%] md:h-[38vh] lg:w-[35vw] lg:h-[40vh]"
              />
            ))}
          </div>
        ) : data?.success && data?.data && data.data.data.length > 0 ? (
          <ParallaxGoTop>
            <ScrollXNonDesktop>
              {data.data.data.map((item) => (
                <CardAlumni
                  key={item.id}
                  img={item.img_alumni}
                  nama={item.name}
                  angkatan={item.angkatan}
                  deskripsi={item.description}
                />
              ))}
              {/* space */}
              <div className="w-1 shrink-0 h-ful" />
            </ScrollXNonDesktop>

            {/* prev & next */}
            <PrevNext
              page={page}
              handlePrev={() => handlePage(page - 1)}
              handleNext={() => handlePage(page + 1)}
              totalPage={data.data.meta.totalPage}
            />
          </ParallaxGoTop>
        ) : (
          <NoData />
        )
      ) : isLoading ? (
        <div className="w-full flex flex-row justify-start items-start gap-4 px-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-[30vh] bg-gray-300 animate-pulse flex flex-row justify-between items-center shrink-0 rounded-2xl overflow-hidden md:w-[85%] md:h-[38vh] lg:w-[35vw] lg:h-[40vh]"
            />
          ))}
        </div>
      ) : data?.success && data?.data && data.data.data.length > 0 ? (
        <ParallaxGoTop>
          <ScrollXDesktop>
            {data.data.data.map((item) => (
              <CardAlumni
                key={item.id}
                img={item.img_alumni}
                nama={item.name}
                angkatan={item.angkatan}
                deskripsi={item.description}
              />
            ))}
            {/* space */}
            <div className="w-1 shrink-0 h-ful" />
          </ScrollXDesktop>

          {/* prev & next */}
          {/* prev & next */}
          <PrevNext
            page={page}
            handlePrev={() => handlePage(page - 1)}
            handleNext={() => handlePage(page + 1)}
            totalPage={data.data.meta.totalPage}
          />
        </ParallaxGoTop>
      ) : (
        <NoData />
      )}
    </section>
  );
};

export default memo(SectionAlumni);
