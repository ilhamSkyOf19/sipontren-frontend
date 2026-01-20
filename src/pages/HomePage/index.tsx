import { useEffect, type FC } from "react";
import SectionBanner from "./SectionBanner";
import SectionLayananPendidikan from "./SectionLayananPendidikan";
import SectionTujuan from "./SectionTujuan";
import SectionKegiatanSantri from "./SectionKegiatanSantri";
import useWindowSize from "../../hooks/useWindowSize";
import SectionBerita from "./SectionBerita";
import SectionMaps from "./SectionMaps";
import Seo from "../../components/Seo";

const HomePage: FC = () => {
  //   window top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Seo
        path="/"
        title="Pondok Pesantren Al-Amin Seputih Banyak – Lampung Tengah"
        description="Website resmi Pondok Pesantren Muhammadiyah Al-Amin Seputih Banyak, Lampung Tengah. Menyediakan informasi program pendidikan, kegiatan santri, pendaftaran, dan berita terkini."
        keywords="pondok pesantren al-amin, pesantren seputih banyak, pesantren lampung tengah, kegiatan santri, pendaftaran santri"
        schema={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Pondok Pesantren Muhammadiyah Al-Amin",
          alternateName: "Ponpes Al-Amin Seputih Banyak",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Seputih Banyak",
            addressRegion: "Lampung Tengah",
            addressCountry: "ID",
          },
          description:
            "Pondok Pesantren Muhammadiyah Al-Amin di Seputih Banyak Lampung Tengah menyediakan pendidikan Islam terpadu, program tahfidz, kegiatan ekstrakurikuler, dan layanan pendaftaran santri baru.",
          makesOffer: [
            {
              "@type": "EducationalOccupationalProgram",
              name: "Program Pendidikan dan Pembinaan Santri",
              description:
                "Program pendidikan formal, tahfidz, ekstrakurikuler, dan pembinaan karakter santri.",
            },
          ],
        }}
      />

      {/* content */}
      <main className="flex flex-col justify-start items-center overflow-hidden">
        {/* section one */}
        <SectionBanner />

        {/* section two */}
        <SectionLayananPendidikan />

        {/* section three */}
        <SectionTujuan />

        {/* section four */}
        <SectionKegiatanSantri width={useWindowSize().width} />

        {/* section five */}
        <SectionBerita width={useWindowSize().width} />

        {/* section six */}
        <SectionMaps />
      </main>
    </>
  );
};

export default HomePage;
