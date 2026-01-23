import { useEffect, type FC } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import HeaderPage from "../../components/HeaderPage";
import SectionSejarah from "./SectionSejarah";
import SectionVisiMisi from "./SectionVisiMisi";
import SectionProgramUnggulan from "./SectionProgramUnggulan";
import SectionFasilitas from "./SectionFasilitas";
import SectionPrestasi from "./SectionPrestasi";
import SectionUstad from "./SectionUstad";
import SectionAlumni from "./SectionAlumni";
import Seo from "../../components/Seo";

const ProfilePage: FC = () => {
  // Window Size
  const widthDevice = useWindowSize().width;

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* seo */}
      <Seo
        path="/profile"
        title="Profil Pondok Pesantren Al-Amin Seputih Banyak – Lampung Tengah"
        description="Profil Pondok Pesantren Muhammadiyah Al-Amin di Seputih Banyak Lampung Tengah. Program tahfidz, pendidikan Islam terpadu, dan pembinaan karakter santri."
        keywords="profil ponpes al amin, pesantren seputih banyak, pesantren lampung tengah"
      />

      {/* content */}
      <main className="w-full h-full flex flex-col justify-start items-center overflow-hidden">
        <HeaderPage
          whiteText1={`Pondok Pesantren`}
          whiteText2="Muhammadiyah Al-Amin"
          YellowText="Seputih Banyak - Lampung Tengah"
          deskripsi="Pondok Pesantren Muhammadiyah Al-Amin Seputih Banyak adalah lembaga pendidikan Islam di Lampung Tengah yang memadukan kurikulum pesantren, tahfidz Al-Qur’an, dan pendidikan karakter. Menjadi pilihan utama masyarakat Seputih Banyak dan sekitarnya untuk membentuk santri berakhlak, berilmu, serta siap melanjutkan ke jenjang pendidikan tinggi."
        />
        <SectionSejarah />
        <SectionVisiMisi />
        <SectionProgramUnggulan />
        <SectionFasilitas widthDevice={widthDevice} />
        <SectionPrestasi />
        <SectionUstad />
        <SectionAlumni />
      </main>
    </>
  );
};

export default ProfilePage;
