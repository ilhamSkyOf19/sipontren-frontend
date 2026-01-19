import CardTotalPrestasi from "../../../components/CardTotalPrestasi";
import SubJudulCenter from "../../../components/SubJudulCenter";
import ParallaxGoTop from "../../../fragments/ParallaxGoTop";

const SectionPrestasi = () => {
  return (
    <ParallaxGoTop>
      <div className="w-full min-h-[40vh] bg-transparent flex flex-col justify-start items-center pb-8 px-6 gap-10 md:gap-22">
        <SubJudulCenter title="Prestasi Santri" />
        <div className="w-full flex flex-row justify-between items-center gap-6 flex-wrap md:px-12 md:gap-12 lg:gap-16 lg:px-20">
          <CardTotalPrestasi tingkat={"Internasional"} jumlah={2} />
          <CardTotalPrestasi tingkat={"Nasional"} jumlah={5} />
          <CardTotalPrestasi tingkat={"Provinsi"} jumlah={12} />
          <CardTotalPrestasi tingkat={"Kabupaten"} jumlah={23} />
        </div>
      </div>
    </ParallaxGoTop>
  );
};

export default SectionPrestasi;
