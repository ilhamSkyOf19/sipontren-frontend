import type { FC } from "react";
import HeaderSection from "../../../components/HeaderSection";
import ParallaxGoTop from "../../../fragments/ParallaxGoTop";

const SectionMaps: FC = () => {
  return (
    <section className="w-full h-auto flex flex-col justify-start items-center gap-12">
      {/* header */}
      <HeaderSection
        judul="Lokasi & Profile"
        ket="Lihat lokasi pesantren melalui peta interaktif dan kenali lebih dekat profil kami melalui video resmi."
      />
      <ParallaxGoTop>
        <div className="w-full flex flex-col justify-center items-center pb-8 gap-7 lg:flex-row px-5 lg:px-12">
          {/* maps */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3975.563039920363!2d105.4426229!3d-4.8448278!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3f60508043822d%3A0xb1dad378b9958f66!2sPonpes%20Al-Amin!5e0!3m2!1sid!2sid!4v1747380711868!5m2!1sid!2sid"
            width="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: "none", borderRadius: "2rem" }}
            className="h-[30vh] md:h-[35vh] lg:h-[45vh]"
          ></iframe>

          {/* yotube */}
          <div className="w-full flex flex-row justify-center items-center overflow-hidden rounded-2xl">
            <iframe
              width="100%"
              src="https://www.youtube.com/embed/L7ybXrt8C-w?si=d6aurhtjdW1c1oeZ"
              title="Profile Pondok Muhammadiyah Al-Amin Seputih Banyak"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="h-[30vh] md:h-[35vh] lg:h-[45vh]"
            ></iframe>
          </div>
        </div>
      </ParallaxGoTop>
    </section>
  );
};

export default SectionMaps;
