import type { FC } from "react";
import CardEkstrakulikuler from "../../../components/CardEkstrakulikuler";
import HeaderSection from "../../../components/HeaderSection";
import ScrollXDesktop from "../../../layouts/ScrollXDesktop";
import dataEkstrakulikuler from "../../../jsons/dataEkstrakulikuler.json";
import type { ImageKey, LogoKey, PersonKey } from "../../../types/type";
import ScrollXNonDesktop from "../../../layouts/ScrollXNonDesktop";

// Props

type Props = {
  width: number;
};

const SectionKegiatanSantri: FC<Props> = ({ width }) => {
  return (
    <div className="w-screen flex flex-col justify-start items-start overflow-hidden">
      <HeaderSection
        judul={"Kegiatan Santri"}
        ket={"Wadah Pengembangan Bakat dan Karakter Santri"}
        mb={
          width > 0 && width <= 760
            ? 5
            : width > 760 && width < 1024
              ? 1
              : width > 1024
                ? 1
                : 1
        }
      />
      {width > 1024 ? (
        <ScrollXDesktop>
          {dataEkstrakulikuler.map((item, index) => (
            <CardEkstrakulikuler
              key={index}
              logo={item.logo as LogoKey}
              person={item.person as PersonKey}
              title={item.title}
              ket={item.ket}
              subJudul={item.subJudul}
              bg={item.bg as ImageKey}
              iconSize={item.iconSize}
              id={item.id}
            />
          ))}
        </ScrollXDesktop>
      ) : (
        <ScrollXNonDesktop>
          {dataEkstrakulikuler.map((item, index) => (
            <CardEkstrakulikuler
              key={index}
              logo={item.logo as LogoKey}
              person={item.person as PersonKey}
              title={item.title}
              ket={item.ket}
              subJudul={item.subJudul}
              bg={item.bg as ImageKey}
              iconSize={item.iconSize}
              id={item.id}
            />
          ))}
        </ScrollXNonDesktop>
      )}
    </div>
  );
};

export default SectionKegiatanSantri;
