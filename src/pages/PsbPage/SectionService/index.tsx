import ImageModel from "../../../components/ImageModel";
import SubJudulLeft from "../../../components/SubJudulLeft";
import ParallaxGoLeft from "../../../fragments/ParallaxGoLeft";
import ParallaxGoRight from "../../../fragments/ParallaxGoRight";
import ParallaxGoTop from "../../../fragments/ParallaxGoTop";
import ServiceInfo from "../ServiceInfo";

const SectionService = () => {
  return (
    <div className="w-full h-auto flex flex-col justify-start items-start px-6 py-12 gap-7 lg:pb-12 lg:pt-0 lg:px-12">
      <div className="w-full flex flex-col justify-start items-start">
        <div className="w-full flex-row justify-start items-center lg:hidden">
          <SubJudulLeft title="One Day, One Service" />
        </div>
        <div className="w-full flex flex-col justify-start items-center mb-16 lg:flex-row lg:justify-between lg:items-end lg:mt-10">
          <ParallaxGoLeft customClass="w-full flex flex-col justify-start items-start gap-6 pt-12 lg:order-2 lg:w-[80%] lg:justify-end lg:mb-7">
            <div className="w-full flex-row justify-start items-center hidden md:hidden lg:flex lg:mb-12">
              <SubJudulLeft
                title="One Day, One Service"
                customSize={"text-3xl"}
              />
            </div>
            <div className="w-full">
              <p className="text-lg text-primary-blue font-semibold md:text-xl">
                Melakukan Pendaftaran
              </p>
              <p className="text-sm md:text-lg lg:text-sm">
                Calon santri dapat melakukan pendaftaran melalui website pondok
                pesantren atau dapat langsung datang di kampung kami yang berada
                di JL. AR. Fakhrudin No. 2. Tanjung Harapan, Sep. Banyak
              </p>
            </div>
            <div className="w-full">
              <p className="text-lg text-primary-blue font-semibold md:text-xl">
                Melakukan Tes/Ujian
              </p>
              <p className="text-sm md:text-lg lg:text-sm">
                Tes tulis meliputi tes baca tulis Al-Qur'an, hafalan surat-surat
                pendek, praktek ibadah, pengetahuan umun dan PAI(pendidikan
                Agama Islan), serta wawancara orang tua dan santri
              </p>
            </div>
            <div className="w-full">
              <p className="text-lg text-primary-blue font-semibold md:text-xl">
                Pengumuman Pendaftaran
              </p>
              <p className="text-sm md:text-lg lg:text-sm">
                Pengumuman kelulusan calon santri akan segera di umumkan melalui
                website atau whatsapp grup
              </p>
            </div>
          </ParallaxGoLeft>

          <ParallaxGoRight customClass="h-[40vh] w-full h-[40vh] flex flex-col justify-end items-center rounded-4xl overflow-hidden md:h-[65vh] lg:h-[70vh] lg:w-[90%] lg:order">
            <ImageModel bg={"primary-yellow"} />
          </ParallaxGoRight>
        </div>
        <div className="w-full h-12 bg-primary-blue rounded-lg md:h-16"></div>
      </div>
      <ParallaxGoTop>
        <div className="w-full flex flex-col justify-start items-start gap-6 pt-4">
          <ServiceInfo />
        </div>
      </ParallaxGoTop>
    </div>
  );
};

export default SectionService;
