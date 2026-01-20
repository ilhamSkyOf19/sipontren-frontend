import type { FC } from "react";
import ImageModel from "../../../components/ImageModel";
import ParallaxGoRight from "../../../fragments/ParallaxGoRight";
import ParallaxGoLeft from "../../../fragments/ParallaxGoLeft";
const SectionVisiMisi: FC = () => {
  return (
    <section className="w-full min-h-screen bg-primary-blue flex flex-col justify-start items-center py-12 px-4 gap-12 lg:px-10 lg:pt-8 lg:pb-20 lg:justify-between">
      <p className="text-3xl font-semibold text-white relative before:absolute before:w-full before:h-0.75 before:bg-primary-yellow before:-bottom-2 before:left-0 md:text-4xl lg:hidden">
        Visi & Misi
      </p>
      <div className="w-full flex flex-col justify-center items-center gap-12 lg:flex-row-reverse lg:gap-20">
        <ParallaxGoLeft customClass="w-full flex flex-col justify-start item-start gap-12 lg:w-[50%] lg:gap-6">
          <p className="text-lg font-semibold text-white relative before:absolute before:w-[20%] before:h-0.75 before:bg-primary-yellow before:-bottom-2 mb-4 hidden lg:flex">
            Visi & Misi
          </p>
          <div className="w-full flex flex-col justify-start items-end gap-4 lg:items-start">
            <p className="text-primary-blue py-2 px-14 bg-white text-xl font-semibold rounded-xl md:text-2xl lg:text-sm lg:px-8 lg:py-1 lg:rounded-lg">
              Visi
            </p>
            <p className="text-sm text-white text-right font-light relative before:absolute before:w-[20%] before:h-0.75 before:bg-primary-yellow before:-bottom-2 before:right-0 md:text-lg lg:text-left lg:before:hidden lg:text-sm">
              Menjadi Lembaga Pendidikan Muhammadiyah Yang Unggul Dalam Ilmu
              Keislaman, Berwawasan Luas, Visioner Dan Santun
            </p>
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-4">
            <p className="text-primary-blue py-2 px-14 bg-white text-xl font-semibold rounded-xl md:text-2xl lg:text-sm lg:py-1 lg:px-8 lg:rounded-lg">
              Misi
            </p>
            <ol className="list-decimal list-outside px-5 space-y-3 relative before:absolute before:w-[20%] before:h-0.75 before:bg-primary-yellow before:-bottom-2 before:left-0 text-white text-sm font-light md:text-xl lg:text-base lg:before:hidden lg:px-3">
              <li>
                Menyelenggarakan pendidikan pesantren integrall dengan memadukan
                kurikulum pesantren dan kurikulum nasional.
              </li>
              <li>
                Menyelenggarakan pendidikan yang berbasis Qur’an dan Hadist yang
                sesuai paham Muhammadiyah.
              </li>
              <li>
                Menanamkan nilai-nilai keimanan dan keislaman untuk menyiapkan
                dan mencetak kader muhammadiyah yang cerdas Iman, Ilmu dan
                Akhlak.
              </li>
              <li>
                Mengembangkan pendidikan Bahasa Arab dan Inggris sebagai alat
                komunikasi untuk mendalami Agama, Ilmu pengetahuan dan
                Teknologi.
              </li>
              <li>
                Membentuk karakter dan mengembangkan minat bakat santri dalam
                berbagai kegiatan keorganisasian dan ekstrakulikuler.
              </li>
              <li>
                Menjadi Lembaga Pendidikan Muhammadiyah Yang Unggul Dalam Ilmu
                Keislaman, Berwawasan Luas, Visioner Dan Santun
              </li>
              <li>
                Menyelengarakan pendidikan yang kreatif, komunikatif, Humanistik
                dan Menyenangkan.
              </li>
            </ol>
          </div>
        </ParallaxGoLeft>

        <ParallaxGoRight customClass="h-[40vh] w-full h-[40vh] flex flex-col justify-end items-center rounded-4xl overflow-hidden md:h-[65vh] lg:h-[70vh] lg:w-[50%]">
          <ImageModel bg={"primary-yellow"} />
        </ParallaxGoRight>
      </div>
    </section>
  );
};

export default SectionVisiMisi;
