import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { UstadService } from "../../../services/ustad.service";
import SubJudulCenter from "../../../components/SubJudulCenter";
import ScrollXNonDesktop from "../../../layouts/ScrollXNonDesktop";
import CardUstad from "../../../components/CardUstad";
import ScrollXDesktop from "../../../layouts/ScrollXDesktop";

// Props
type Props = {
  widthDevice: number;
};

const SectionUstad: FC<Props> = ({ widthDevice }) => {
  // use query
  const { data, isLoading } = useQuery({
    queryKey: ["profile-ustad"],
    queryFn: () => UstadService.read(),
  });

  return (
    <div className="w-full min-h-[40vh] bg-transparent flex flex-col justify-start items-center py-12 gap-14">
      <SubJudulCenter title="Profile Asatid/Ustadzah" />
      {widthDevice < 1024 ? (
        isLoading ? (
          <div className="w-full h-full flex flex-row justify-center items-center">
            <span>loading</span>
          </div>
        ) : data?.success && data?.data && data?.data.length > 0 ? (
          <ScrollXNonDesktop gap={widthDevice < 700 ? 4 : 4}>
            {data.data.map((item) => (
              <CardUstad
                key={item.id}
                img={item.ustad_img}
                nama={item.name}
                jabatan={item.jabatan}
              />
            ))}
          </ScrollXNonDesktop>
        ) : (
          <div className="w-full flex flex-row justify-center items-center">
            <p className="text-base text-primary-blue font-medium md:text-lg ">
              Tidak ada data
            </p>
          </div>
        )
      ) : isLoading ? (
        <div className="w-full h-full flex flex-row justify-center items-center">
          <span>loading</span>
        </div>
      ) : data?.success && data?.data && data?.data.length > 0 ? (
        <ScrollXDesktop>
          {data.data.map((item) => (
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
    </div>
  );
};

export default SectionUstad;
