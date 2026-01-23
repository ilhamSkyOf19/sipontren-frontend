import fileThumb from "../../assets/icons/file_thumb.webp";
import { Typewriter } from "react-simple-typewriter";
import type { FC } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import ParallaxGoRight from "../../fragments/ParallaxGoRight";
import ParallaxGoLeft from "../../fragments/ParallaxGoLeft";

// Props
type Props = {
  whiteText1: string;
  whiteText2: string;
  YellowText: string;
  deskripsi: string;
};
const HeaderPage: FC<Props> = ({
  whiteText1,
  whiteText2,
  YellowText,
  deskripsi,
}) => {
  const window = useWindowSize().width;
  return (
    <section
      className="w-full min-h-[45vh] bg-primary-blue flex flex-col justify-center items-start px-4 pt-[30%] pb-[10%] relative overflow-hidden md:flex-row md:items-center md:pt-[20%] lg:pt-[10%] lg:min-h-[80vh] lg:px-8"
      aria-label="Profil Pondok Pesantren Al-Amin Seputih Banyak"
    >
      <div className="flex flex-col justify-center items-start gap-3 z-10 lg:pr-32 lg:gap-4">
        <ParallaxGoRight>
          {/* H1 UTAMA SEO */}
          <h1 className="text-xl text-white font-semibold md:text-3xl lg:text-5xl lg:mb-2">
            {window > 1024 ? (
              <Typewriter
                words={[whiteText1]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={100}
                delaySpeed={1000}
              />
            ) : (
              whiteText1
            )}
          </h1>

          {/* H2 pendukung */}
          <h2 className="text-xl text-white font-semibold md:text-3xl lg:text-5xl lg:mb-4">
            {whiteText2}
          </h2>

          {/* Lokasi wajib ada di heading */}
          <h3 className="w-[80%] text-xl text-primary-yellow font-semibold md:text-2xl lg:text-3xl lg:mb-2">
            {YellowText}
          </h3>

          {/* Paragraf utama SEO */}
          <p className="w-[70%] text-xs text-white font-light md:text-lg leading-relaxed">
            {deskripsi}
          </p>

          {/* Hidden text untuk penguatan keyword (aman & natural) */}
          <div className="sr-only">
            Pondok Pesantren Al Amin adalah pesantren Muhammadiyah di Kecamatan
            Seputih Banyak, Kabupaten Lampung Tengah yang menerima santri dari
            seluruh wilayah Lampung dan Sumatera.
          </div>
        </ParallaxGoRight>
      </div>

      <figure className="absolute z-0 -right-20 top-[35%] md:inline-block md:right-8 lg:top-[20%] lg:right-16 lg:flex lg:h-full lg:flex-row lg:justify-center lg:pt-20">
        <ParallaxGoLeft customClass="lg:w-[20rem] lg:h-80">
          <img
            src={fileThumb}
            alt="logo sipontren"
            className="w-48 opacity-60 md:w-56 md:opacity-100 lg:w-full"
          />
        </ParallaxGoLeft>
        <figcaption className="sr-only">
          Logo resmi Pondok Pesantren Al Amin Seputih Banyak
        </figcaption>
      </figure>
    </section>
  );
};

export default HeaderPage;
