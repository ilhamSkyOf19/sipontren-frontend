import { memo } from "react";
import CardTotalPrestasi from "../../../components/CardTotalPrestasi";
import SubJudulCenter from "../../../components/SubJudulCenter";
import ParallaxGoTop from "../../../fragments/ParallaxGoTop";
import { useQuery } from "@tanstack/react-query";
import { PrestasiService } from "../../../services/prestasi.service";

const SectionPrestasi = () => {
  // use query
  const { data: prestasiCount, isLoading } = useQuery({
    queryKey: ["prestasiCount"],
    queryFn: () => PrestasiService.getCount(),
    refetchOnWindowFocus: false,
  });
  return (
    <ParallaxGoTop>
      <div className="w-full min-h-[40vh] bg-transparent flex flex-col justify-start items-center pb-8 px-6 gap-10 md:gap-22">
        <SubJudulCenter title="Prestasi Santri" />
        <div className="w-full flex flex-row justify-between items-center gap-6 flex-wrap md:px-12 md:gap-12 lg:gap-16 lg:px-20">
          <CardTotalPrestasi
            tingkat={"Internasional"}
            jumlah={
              isLoading
                ? 0
                : prestasiCount?.success && prestasiCount?.data.internasional
                  ? prestasiCount?.data.internasional
                  : 0
            }
          />
          <CardTotalPrestasi
            tingkat={"Nasional"}
            jumlah={
              isLoading
                ? 0
                : prestasiCount?.success && prestasiCount?.data.nasional
                  ? prestasiCount?.data.nasional
                  : 0
            }
          />
          <CardTotalPrestasi
            tingkat={"Provinsi"}
            jumlah={
              isLoading
                ? 0
                : prestasiCount?.success && prestasiCount?.data.provinsi
                  ? prestasiCount?.data.provinsi
                  : 0
            }
          />
          <CardTotalPrestasi
            tingkat={"Kabupaten"}
            jumlah={
              isLoading
                ? 0
                : prestasiCount?.success && prestasiCount?.data.kabupaten
                  ? prestasiCount?.data.kabupaten
                  : 0
            }
          />
          <CardTotalPrestasi
            tingkat={"Kecamatan"}
            jumlah={
              isLoading
                ? 0
                : prestasiCount?.success && prestasiCount?.data.kecamatan
                  ? prestasiCount?.data.kecamatan
                  : 0
            }
          />
        </div>
      </div>
    </ParallaxGoTop>
  );
};

export default memo(SectionPrestasi);
