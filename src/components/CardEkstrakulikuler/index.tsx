import bg1 from "../../assets/ekstrakulikuler/bg-1.png";
import bg2 from "../../assets/ekstrakulikuler/bg-2.png";
import bg3 from "../../assets/ekstrakulikuler/bg-3.webp";
import bg4 from "../../assets/ekstrakulikuler/bg-4.webp";
import bg5 from "../../assets/ekstrakulikuler/bg-5.png";
import bg6 from "../../assets/ekstrakulikuler/bg-6.webp";
import bgPaskibra from "../../assets/ekstrakulikuler/bg-paskibra.webp";
import bgKokam from "../../assets/ekstrakulikuler/bg-kokam.webp";
import person1 from "../../assets/ekstrakulikuler/person-1.png";
import person2 from "../../assets/ekstrakulikuler/person-2.webp";
import person3 from "../../assets/ekstrakulikuler/person-3.png";
import person4 from "../../assets/ekstrakulikuler/person-4.png";
import person5 from "../../assets/ekstrakulikuler/person-5.png";
import person6 from "../../assets/ekstrakulikuler/tapak_suci.png";
import personKokam from "../../assets/ekstrakulikuler/person-kokam.webp";
import personPaskibra from "../../assets/ekstrakulikuler/person-paskibra.webp";
import logo1 from "../../assets/icons/logo-1.webp";
import logo2 from "../../assets/icons/logo-2.webp";
import logo3 from "../../assets/icons/logo-3.webp";
import { useMemo, type FC } from "react";
import { memo } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import type { ImageKey, LogoKey, PersonKey } from "../../types/type";

// Props
type Props = {
  logo: LogoKey;
  person: PersonKey;
  title: string;
  ket: string;
  subJudul?: string;
  bg: ImageKey;
  iconSize: string;
  id: number;
};
const CardEkstrakulikuler: FC<Props> = ({
  logo,
  person,
  title,
  ket,
  subJudul,
  bg,
  iconSize = "55%",
  id,
}) => {
  const images = useMemo(
    () => ({
      bg1: bg1,
      bg2: bg2,
      bg3: bg3,
      bg4: bg4,
      bg5: bg5,
      bg6: bg6,
      bgKokam: bgKokam,
      bgPaskibra: bgPaskibra,
      person1: person1,
      person2: person2,
      person3: person3,
      person4: person4,
      person5: person5,
      person6: person6,
      personKokam: personKokam,
      personPaskibra: personPaskibra,
      logo1: logo1,
      logo2: logo2,
      logo3: logo3,
    }),
    [],
  );

  const window = useWindowSize().width;
  return (
    <div className="w-[95%] h-88 bg-white rounded-xl shadow-xl flex flex-col justify-between items-center overflow-hidden shrink-0 md:w-[65%] md:h-120 md:mt-12 lg:w-md lg:h-88">
      <div
        className={`w-full h-[50%] flex flex-row justify-between items-center bg-cover overflow-hidden group`}
        style={{ backgroundImage: `url(${images[bg]})` }}
      >
        {id === 2 ? (
          <>
            <div className="w-[80%] h-full flex flex-row justify-end items-center pt-4 relative">
              <img
                src={images[person]}
                alt="logo"
                width={window > 1024 ? "45%" : "55%"}
                className="absolute left-5 group-hover:scale-105 transition-transform duration-300 ease-in-out"
                loading="lazy"
              />
              <img
                src={person3}
                alt="logo"
                width={window > 1024 ? "45%" : "55%"}
                className="mt-4 absolute right-4 -bottom-4 lg:right-10 group-hover:scale-105 transition-transform duration-300 ease-in-out"
                loading="lazy"
              />
            </div>
            <div className="w-[50%] h-full flex justify-center items-center">
              <img
                src={images[logo]}
                alt="logo"
                width={iconSize}
                loading="lazy"
              />
            </div>
          </>
        ) : id === 1 ? (
          <>
            <div className="w-[50%] h-full flex justify-center items-center">
              <img
                src={images[logo]}
                alt="logo"
                width={iconSize}
                loading="lazy"
              />
            </div>
            <div className="w-[50%] h-full flex justify-end items-center pt-4 relative">
              <img
                src={images[person]}
                alt="logo"
                width={window > 1024 ? "70%" : "85%"}
                className="absolute -bottom-4 group-hover:scale-105 transition-transform duration-300 ease-in-out"
                loading="lazy"
              />
            </div>
          </>
        ) : id === 5 ? (
          <>
            <div className="w-[65%] h-full flex justify-start items-center pt-8 pl-2 relative">
              <img
                src={images[person]}
                alt="logo"
                width={window > 1024 ? "80%" : "100%"}
                className="absolute -bottom-4 group-hover:scale-105 transition-transform duration-300 ease-in-out"
                loading="lazy"
              />
            </div>
            <div className="w-[35%] h-full flex justify-start items-center">
              <img
                src={images[logo]}
                alt="logo"
                width={iconSize}
                loading="lazy"
              />
            </div>
          </>
        ) : id === 3 ? (
          <>
            <div className="w-[70%] h-full flex justify-start items-center pt-4 pl-2 relative">
              <img
                src={images[person]}
                alt="logo"
                width={window > 1024 ? "75%" : "90%"}
                loading="lazy"
                className="group-hover:scale-105 transition-transform duration-300 ease-in-out -bottom-10 absolute"
              />
            </div>
            <div className="w-[40%] h-full flex justify-center items-center"></div>
          </>
        ) : id === 4 ? (
          <>
            <div className="w-[50%] h-full flex justify-start items-center pt-12 pl-0 relative">
              <img
                src={images[person]}
                alt="logo"
                width={window > 1024 ? "75%" : "90%"}
                loading="lazy"
                className="absolute -bottom-10 group-hover:scale-105 transition-transform duration-300 ease-in-out "
              />
            </div>
            <div className="w-[40%] h-full flex justify-center items-center"></div>
          </>
        ) : id === 6 ? (
          <>
            <div className="w-[50%] h-full flex justify-start items-center pl-0 relative">
              <img
                src={images[person]}
                alt="logo"
                width={window > 1024 ? "75%" : "90%"}
                loading="lazy"
                className="absolute -bottom-2 group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
            <div className="w-[40%] h-full flex justify-center items-center"></div>
          </>
        ) : id === 7 ? (
          <>
            <div className="w-[50%] h-full flex justify-start items-center pl-0 pt-12 relative">
              <img
                src={images[person]}
                alt="logo"
                width={window > 1024 ? "75%" : "90%"}
                loading="lazy"
                className="absolute -bottom-10 group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
            <div className="w-[40%] h-full flex justify-center items-center"></div>
          </>
        ) : null}
      </div>
      <div className="w-full h-[45%] flex flex-col justify-start items-start gap-1 px-4 md:gap-2">
        <p className="text-[0.7rem] px-4 py-1 bg-secondary-blue text-white rounded-sm md:text-lg lg:text-xs">
          {subJudul}
        </p>
        <p className="text-md font-semibold md:text-lg lg:text-sm">{title}</p>
        <p className="text-xs font-light md:text-sm lg:text-sm">{ket}</p>
      </div>
    </div>
  );
};

export default memo(CardEkstrakulikuler);
