import { useEffect, type FC } from "react";
import HeaderPage from "../../components/HeaderPage";
import DailySantri from "./SectionDailySantri";
import GallerySantri from "./SectionGallerySantri";

const KemahadanPage: FC = () => {
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full h-full flex flex-col justify-start items-center overflow-hidden">
      <HeaderPage
        whiteText1={"Pondok Pesantren"}
        whiteText2={"Muhammadiyah Al-Amin"}
        YellowText={"Seputih Banyak - Lampung Tengah"}
        deskripsi={
          "Pesantren ini bersiri sebagai salah satu upaya Muhammadiyah untuk mencetak generasi muda yang berakhlak mulia, memiliki wawasan keislaman yang mendalam, serta mampu berkontribusi dalam pembangunan masyarakat."
        }
      />
      <DailySantri />
      <GallerySantri />
    </main>
  );
};

export default KemahadanPage;
