import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { UstadService } from "../../../services/ustad.service";
import SubJudulCenter from "../../../components/SubJudulCenter";
import ScrollXNonDesktop from "../../../layouts/ScrollXNonDesktop";
import CardUstad from "../../../components/CardUstad";
import ScrollXDesktop from "../../../layouts/ScrollXDesktop";
import NoData from "../../../components/NoData";
import ParallaxGoTop from "../../../fragments/ParallaxGoTop";

// Props
type Props = {
  widthDevice: number;
};

const SectionUstad: FC<Props> = ({ widthDevice }) => {
  // use query
  const { data, isLoading } = useQuery({
    queryKey: ["profile-ustad"],
    queryFn: () =>
      UstadService.read({
        page: undefined,
        search: undefined,
      }),
  });

  return (
    <section className="w-full min-h-[40vh] bg-transparent flex flex-col justify-start items-center py-12 gap-14">
      <ParallaxGoTop>
        <SubJudulCenter title="Profile Asatid/Ustadzah" />
        {widthDevice < 1024 ? (
          isLoading ? (
            <div className="w-full h-full flex flex-row justify-start items-center px-4 gap-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="w-48 h-[40vh] bg-gray-300 animate-pulse flex flex-col justify-start items-center shrink-0 rounded-2xl overflow-hidden md:w-76 md:h-[40vh] lg:w-50 lg:h-[43vh]"
                />
              ))}
            </div>
          ) : data?.success && data?.data.data && data?.data.data.length > 0 ? (
            <ScrollXNonDesktop gap={4}>
              {data.data.data.map((item) => (
                <CardUstad
                  key={item.id}
                  img={item.ustad_img}
                  nama={item.name}
                  jabatan={item.jabatan}
                />
              ))}
            </ScrollXNonDesktop>
          ) : (
            <NoData />
          )
        ) : isLoading ? (
          <div className="w-full h-full flex flex-row justify-start items-center px-4 gap-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="w-48 h-[40vh] bg-gray-300 animate-pulse flex flex-col justify-start items-center shrink-0 rounded-2xl overflow-hidden md:w-76 md:h-[40vh] lg:w-50 lg:h-[43vh]"
              />
            ))}
          </div>
        ) : data?.success && data?.data.data && data?.data.data.length > 0 ? (
          <ScrollXDesktop>
            {data.data.data.map((item) => (
              <CardUstad
                key={item.id}
                img={item.ustad_img}
                nama={item.name}
                jabatan={item.jabatan}
              />
            ))}
          </ScrollXDesktop>
        ) : (
          <div className="w-full flex flex-row justify-center items-center">
            <p className="text-base text-primary-blue font-medium md:text-lg ">
              Tidak ada data
            </p>
          </div>
        )}
      </ParallaxGoTop>
    </section>
  );
};

export default SectionUstad;
