import { useEffect, type FC } from "react";
import HeaderPage from "../../components/HeaderPage";
import DailySantri from "./SectionDailySantri";
import GallerySantri from "./SectionGallerySantri";
import Seo from "../../components/Seo";

const KemahadanPage: FC = () => {
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* SEO Reusable */}
      <Seo
        path="/kemahadan"
        title="Kemahadhan Ponpes Al-Amin Seputih Banyak – Program Santri"
        description="Halaman Kemahadhan Pondok Pesantren Muhammadiyah Al-Amin Seputih Banyak. Informasi program pembinaan, kegiatan santri, dan pengembangan akhlak serta pendidikan Islam."
        keywords="kemahadhan ponpes al-amin, pondok pesantren seputih banyak, program santri lampung tengah"
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
          hasCourse: [
            {
              "@type": "Course",
              name: "Kemahadhan",
              description:
                "Program pembinaan santri dengan fokus akhlak, disiplin, dan pendidikan Islam.",
            },
          ],
        }}
      />

      <main className="w-full h-full flex flex-col justify-start items-center overflow-hidden">
        <HeaderPage
          whiteText1="Kemahadhan"
          whiteText2="Ponpes Al-Amin"
          YellowText="Seputih Banyak - Lampung Tengah"
          deskripsi="Program Kemahadhan di Pondok Pesantren Muhammadiyah Al-Amin Seputih Banyak bertujuan membentuk santri berakhlak mulia, disiplin, dan memiliki wawasan keislaman yang mendalam."
        />
        <DailySantri />
        <GallerySantri />
      </main>
    </>
  );
};

export default KemahadanPage;
