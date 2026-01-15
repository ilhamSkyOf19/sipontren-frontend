import type { FC } from "react";
import SectionBanner from "./SectionBanner";
import SectionLayananPendidikan from "./SectionLayananPendidikan";
import SectionTujuan from "./SectionTujuan";
import SectionKegiatanSantri from "./SectionKegiatanSantri";
import useWindowSize from "../../hooks/useWindowSize";
import SectionBerita from "./SectionBerita";
import SectionMaps from "./SectionMaps";

const HomePage: FC = () => {
  return (
    <main className="flex flex-col overflow-hidden">
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
  );
};

export default HomePage;
