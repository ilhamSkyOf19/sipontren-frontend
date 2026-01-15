import { useEffect } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import HeaderPage from "../../components/HeaderPage";
import SectionService from "./SectionService";
import SectionPamflet from "./SectionPamflet";
import SectionInfo from "./SectionInfo";

const PsbPage = () => {
  // scroll to top
  useEffect(() => {
    if (window) {
      window.scrollTo(0, 0);
    }
  }, []);

  const widthDevice = useWindowSize().width;
  return (
    <main className="w-full h-full flex flex-col justify-start items-start">
      <div className="w-full flex flex-col justify-start items-center">
        <HeaderPage
          whiteText1={"Penerimaan Santri Baru"}
          whiteText2={""}
          YellowText={"Tahun Ajaran 2025/2026"}
          deskripsi={
            "Kunjungi website PSB Pondok Pesantren Muhammadiyah Al-Amin Seputih Banyak, lengkapi setiap persyaratan, ikuti semua alur pendaftaran dan jadilan bagian dari Pondok Pesantren Muhammadiyah Al-Alim Seputih Banyak."
          }
        />
        <SectionService />
        <SectionPamflet />
        <SectionInfo width={widthDevice} />
      </div>
    </main>
  );
};

export default PsbPage;
