import { useEffect } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import HeaderPage from "../../components/HeaderPage";
import SectionService from "./SectionService";
import SectionPamflet from "./SectionPamflet";
import SectionInfo from "./SectionInfo";
import Seo from "../../components/Seo";

const PsbPage = () => {
  // scroll to top
  useEffect(() => {
    if (window) {
      window.scrollTo(0, 0);
    }
  }, []);

  const widthDevice = useWindowSize().width;
  return (
    <>
      <Seo
        path="/psb"
        title="Pendaftaran Santri Baru Ponpes Al-Amin Seputih Banyak – PSB 2026"
        description="Informasi lengkap Penerimaan Santri Baru (PSB) Pondok Pesantren Muhammadiyah Al-Amin Seputih Banyak, Lampung Tengah. Jadwal, persyaratan, dan layanan pendaftaran santri baru."
        keywords="psb ponpes al-amin, pendaftaran santri baru seputih banyak, daftar pesantren lampung tengah"
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
              name: "Penerimaan Santri Baru (PSB)",
              description:
                "Program pendaftaran santri baru di Pondok Pesantren Muhammadiyah Al-Amin, lengkap dengan jadwal, syarat, dan layanan pendaftaran.",
            },
          ],
        }}
      />

      <main className="w-full h-full flex flex-col justify-center items-center">
        <HeaderPage
          whiteText1="Penerimaan Santri Baru"
          whiteText2="Ponpes Al-Amin"
          YellowText="Seputih Banyak - Lampung Tengah"
          deskripsi="Informasi resmi Penerimaan Santri Baru (PSB) Pondok Pesantren Muhammadiyah Al-Amin Seputih Banyak. Jadwal, layanan, dan persyaratan untuk calon santri."
        />
        <SectionService />
        <SectionPamflet />
        <SectionInfo width={widthDevice} />
      </main>
    </>
  );
};

export default PsbPage;
