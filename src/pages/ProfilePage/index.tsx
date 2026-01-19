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

const ProfilePage: FC = () => {
  // Window Size
  const widthDevice = useWindowSize().width;

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full h-full flex flex-col justify-start items-center overflow-hidden">
      <HeaderPage
        whiteText1={`Pondok Pesantren`}
        whiteText2="Muhammadiyah Al-Amin"
        YellowText="Seputih Banyak - Lampung Tengah"
        deskripsi="Pesantren ini berdiri sebagai salah satu upaya Muhammadiyah untuk mencetak generasi muda yang berakhlak mulia, memiliki wawasan keislaman yang mendalam, serta mampu berkontribusi dalam pembangunan masyarakat."
      />
      <SectionSejarah />
      <SectionVisiMisi />
      <SectionProgramUnggulan />
      <SectionFasilitas widthDevice={widthDevice} />
      <SectionPrestasi />
      <SectionUstad widthDevice={widthDevice} />
      <SectionAlumni widthDevice={widthDevice} />
    </main>
  );
};

export default ProfilePage;
