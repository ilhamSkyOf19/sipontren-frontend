import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { FasilitasService } from "../../../services/fasilitas.service";
import SubJudulLeft from "../../../components/SubJudulLeft";
import SubJudulCenter from "../../../components/SubJudulCenter";
import ScrollXNonDesktop from "../../../layouts/ScrollXNonDesktop";
import CardFasilitas from "../../../components/CardFasilitas";
import NoData from "../../../components/NoData";

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
      {widthDevice < 1024 && (
        <div className="w-full flex flex-row justify-start items-start px-4">
          <SubJudulLeft title={"Fasilitas"} px={7} />
        </div>
      )}
      {widthDevice > 1024 && <SubJudulCenter title={"Fasilitas"} />}
      {widthDevice < 1024 ? (
        isLoading ? (
          <div className="w-full flex flex-row justify-center items-center">
            <span>loading</span>
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
        <div className="w-full flex flex-row justify-center items-center">
          <span>loading</span>
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
    </div>
  );
};

export default SectionFasilitas;
