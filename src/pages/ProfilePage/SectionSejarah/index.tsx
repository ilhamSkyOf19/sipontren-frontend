import SubJudulLeft from "../../../components/SubJudulLeft";
import masjid from "../../../assets/fasilitas/masjid.png";
import ParallaxGoTop from "../../../fragments/ParallaxGoTop";

const SectionSejarah = () => {
  return (
    <div className="w-full min-h-[40vh] flex flex-col justify-start items-start py-8 px-4 gap-8 md:min-h-[30vh] lg:min-h-[60vh] lg:py-20 overflow-hidden">
      {/* title */}
      <SubJudulLeft title={"Sejarah"} />

      {/* content */}
      <div className="w-full flex flex-col justify-start items-start lg:flex-row">
        {/* text */}
        <p className="text-base font-medium flex-2 lg:text-lg leading-8">
          Pondok Pesantren Muhammadiyah (
          <span className="bg-primary-blue text-white px-1 rounded font-medium">
            PontrenMu
          </span>
          ) Al-Amin Seputih Banyak didirikan sebagai ikhtiar Persyarikatan
          Muhammadiyah dalam menghadirkan pendidikan Islam yang memadukan sistem
          pesantren dengan pendidikan formal. Sejak awal berdiri,{" "}
          <span className="bg-primary-blue text-white px-1 rounded font-medium">
            PontrenMu Al-Amin
          </span>{" "}
          berkomitmen membina santri melalui{" "}
          <span className="bg-primary-blue text-white px-1 rounded font-medium">
            integrasi pendidikan diniyah
          </span>
          ,{" "}
          <span className="bg-primary-blue text-white px-1 rounded font-medium">
            tahfizh Al-Qur’an
          </span>
          , dan{" "}
          <span className="bg-primary-blue text-white px-1 rounded font-medium">
            kurikulum umum
          </span>{" "}
          dalam lingkungan berasrama guna membentuk generasi yang{" "}
          <span className="bg-primary-blue text-white px-1 rounded font-medium">
            beriman, berilmu, berakhlak mulia
          </span>
          , mandiri, serta siap berperan dalam{" "}
          <span className="bg-primary-blue text-white px-1 rounded font-medium">
            dakwah dan pengabdian
          </span>{" "}
          kepada masyarakat.
        </p>

        {/* icon */}
        <div className="flex-3 h-full hidden flex-row justify-center items-center relative md:hidden lg:flex">
          <ParallaxGoTop>
            <img
              src={masjid}
              alt="masjid"
              className="w-full object-contain absolute -top-64 -right-32 scale-x-[-1]"
              loading="lazy"
            />
          </ParallaxGoTop>
        </div>
      </div>
    </div>
  );
};

export default SectionSejarah;
