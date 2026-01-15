import type { FC } from "react";
import { AlumniService } from "../../../services/alumni.service";
import { useQuery } from "@tanstack/react-query";
import SubJudulCenter from "../../../components/SubJudulCenter";
import ScrollXNonDesktop from "../../../layouts/ScrollXNonDesktop";
import CardAlumni from "../../../components/CardAlumni";
import NoData from "../../../components/NoData";
import ScrollXDesktop from "../../../layouts/ScrollXDesktop";

// Props
type Props = {
  widthDevice: number;
};

const SectionAlumni: FC<Props> = ({ widthDevice }) => {
  // use query
  const { data, isLoading } = useQuery({
    queryKey: ["alumniForUSer"],
    queryFn: () => AlumniService.read(),
  });

  return (
    <div className="w-full min-h-[40vh] bg-transparent flex flex-col justify-start items-center py-12 gap-14">
      <SubJudulCenter title="Apa Kata Lulusan" />
      {widthDevice < 1024 ? (
        isLoading ? (
          <span>loding</span>
        ) : data?.success && data?.data && data.data.length > 0 ? (
          <ScrollXNonDesktop>
            {data.data.map((item) => (
              <CardAlumni
                key={item.id}
                img={item.img_alumni}
                nama={item.name}
                angkatan={item.angkatan}
                deskripsi={item.description}
              />
            ))}
          </ScrollXNonDesktop>
        ) : (
          <NoData />
        )
      ) : isLoading ? (
        <span>loading</span>
      ) : data?.success && data?.data && data.data.length > 0 ? (
        <ScrollXDesktop>
          {data.data.map((item) => (
            <CardAlumni
              key={item.id}
              img={item.img_alumni}
              nama={item.name}
              angkatan={item.angkatan}
              deskripsi={item.description}
            />
          ))}
        </ScrollXDesktop>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default SectionAlumni;
