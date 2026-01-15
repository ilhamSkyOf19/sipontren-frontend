import { memo, useState, type FC, type ReactNode } from "react";
import useWindowSize from "../../../hooks/useWindowSize";
const ServiceInfo = () => {
  const window = useWindowSize().width;

  const [active, setActive] = useState(1);
  return (
    <div className="w-full h-[72vh] border flex flex-col justify-start items-center rounded-4xl border-secondary-blue pb-0 overflow-hidden lg:flex-row lg:pb-0 lg:justify-start lg:px-6">
      {window < 1024 ? (
        <>
          <SlideDownService
            id={1}
            active={active}
            setActive={setActive}
            title="Waktu Pelayanan Pendaftaran"
            no="01"
            first={true}
          >
            <div className="w-full px-5 flex flex-col justify-start items-start gap-4 md:pr-20 md:py-6 md:gap-6">
              <div className="w-full flex flex-col justify-start items-start gap-1">
                <p className="text-sm text-slate-500 md:text-lg">
                  Pondok Pesantren Muhammadiyah Al-Amin Seputih Banyak - Lampung
                  Tengah
                </p>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-1">
                <p className="text-sm text-primary-blue font-semibold md:text-xl">
                  Hari kerja pukul 08.00 - 16.00
                </p>
                <p className="text-sm text-primary-blue font-semibold md:text-xl">
                  Pendaftan Online Buka 24 Jam
                </p>
              </div>
            </div>
          </SlideDownService>
          <SlideDownService
            id={2}
            active={active}
            setActive={setActive}
            title="Pendaftaran On Desk"
            no="02"
            first={false}
          >
            <div className="w-full px-5 flex flex-col justify-start items-start gap-4 md:pr-20 md:py-6 md:gap-6">
              <div className="w-full flex flex-col justify-start items-start gap-1">
                {/* <TextSmBlue text="Waktu Pelayanan Pendaftaran" /> */}
                <p className="text-sm text-slate-500 md:text-lg">
                  Pondok Pesantren Muhammadiyah Al-Amin Seputih Banyak - Lampung
                  Tengah
                </p>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-1">
                <p className="text-sm text-primary-blue font-semibold md:text-xl">
                  Hari kerja pukul 08.00 - 16.00
                </p>
                <p className="text-sm text-primary-blue font-semibold md:text-xl">
                  Pendaftaran Online Buka 24 Jam
                </p>
              </div>
            </div>
          </SlideDownService>
          <SlideDownService
            id={3}
            active={active}
            setActive={setActive}
            title="Syarat Pendaftaran"
            no="03"
            first={false}
          >
            <div className="w-full px-5 flex flex-col justify-start items-start gap-4 md:py-7">
              <p className="text-sm text-primary-blue font-semibold md:text-xl">
                Persyaratan
              </p>
              <div className="w-full pl-2 flex flex-col justify-start items-start gap-4">
                <ol className="list-disc list-outside px-5 space-y-1">
                  <li className="text-primary-blue text-sm md:text-xl">
                    Mengisi formulir pendaftaran (online/offline)
                  </li>
                  <li className="text-primary-blue text-sm md:text-xl">
                    Foto berwarna (3x4) 4 lembar
                  </li>
                  <li className="text-primary-blue text-sm md:text-xl">
                    FC. Akta Kelahiran
                  </li>
                  <li className="text-primary-blue text-sm md:text-xl">
                    FC. Kartu Keluarga 3 lembar
                  </li>
                  <li className="text-primary-blue text-sm md:text-xl">
                    FC. KTP orang tua, masing-masing 2 lembar
                  </li>
                  <li className="text-primary-blue text-sm md:text-xl">
                    FC. KIP/KTS 2 lembar (bila ada)
                  </li>
                </ol>
              </div>
            </div>
          </SlideDownService>
          <SlideDownService
            id={4}
            active={active}
            setActive={setActive}
            title="Pusat Bantuan"
            no="04"
            first={false}
          >
            <div className="w-full px-5 flex flex-col justify-start items-start gap-2">
              <p className="text-sm text-primary-blue font-semibold md:text-xl">
                Hubungi Pusat Bantuan
              </p>
              <div className="w-full flex-col justify-start items-start pl-2">
                <p className="text-sm text-slate-500 md:text-xl">
                  {" "}
                  No Telepone / WA : +62 822-7821-9515
                </p>
                <p className="text-sm text-slate-500 md:text-xl">
                  No Telepone / WA : +62 822-7821-9515
                </p>
              </div>
            </div>
          </SlideDownService>
        </>
      ) : (
        <>
          <SlideDownServiceDesktop
            id={1}
            active={active}
            setActive={setActive}
            title="Waktu Pelayanan Pendaftaran"
            no="01"
            first={true}
          >
            <div className="w-md pl-5 flex flex-col justify-start items-start py-6 gap-6">
              <div className="w-full flex flex-col justify-start items-start gap-1">
                <p className="text-sm text-slate-500 md:text-lg">
                  Pondok Pesantren Muhammadiyah Al-Amin Seputih Banyak - Lampung
                  Tengah
                </p>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-1">
                <p className="text-sm text-primary-blue font-semibold md:text-xl">
                  Hari kerja pukul 08.00 - 16.00
                </p>
                <p className="text-sm text-primary-blue font-semibold md:text-xl">
                  Pendaftaran Online Buka 24 Jam
                </p>
              </div>
            </div>
          </SlideDownServiceDesktop>
          <SlideDownServiceDesktop
            id={2}
            active={active}
            setActive={setActive}
            title="Pendaftaran On Desk"
            no="02"
            first={false}
          >
            <div className="w-120 px-5 flex flex-col justify-start items-start gap-4 md:pr-20 md:py-6 md:gap-6">
              <div className="w-full flex flex-col justify-start items-start gap-1">
                <p className="text-sm text-slate-500 md:text-lg">
                  Pondok Pesantren Muhammadiyah Al-Amin Seputih Banyak - Lampung
                  Tengah
                </p>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-1">
                <p className="text-sm text-primary-blue font-semibold md:text-xl">
                  Hari Kerja Pukul 08.00 - 16.00
                </p>
                <p className="text-sm text-primary-blue font-semibold md:text-xl">
                  Pendaftaran Online Buka 24 Jam
                </p>
              </div>
            </div>
          </SlideDownServiceDesktop>
          <SlideDownServiceDesktop
            id={3}
            active={active}
            setActive={setActive}
            title="Syarat Pendaftaran"
            no="03"
            first={false}
          >
            <div className="w-120 px-5 flex flex-col justify-start items-start gap-4 md:pr-20 md:py-6 md:gap-6">
              <p className="text-sm text-primary-blue font-semibold md:text-xl">
                Persyaratan
              </p>
              <div className="w-full pl-2 flex flex-col justify-start items-start gap-4">
                <ol className="list-disc list-outside px-5 space-y-1">
                  <li className="text-primary-blue text-lg">
                    Mengisi formulir pendaftaran (online/offline)
                  </li>
                  <li className="text-primary-blue text-lg">
                    Foto berwarna (3x4) 4 lembar
                  </li>
                  <li className="text-primary-blue text-lg">
                    FC. Akta Kelahiran
                  </li>
                  <li className="text-primary-blue text-lg">
                    FC. Kartu Keluarga 3 lembar
                  </li>
                  <li className="text-primary-blue text-lg">
                    FC. KTP orang tua, masing-masing 2 lembar
                  </li>
                  <li className="text-primary-blue text-lg">
                    FC. KIP/KTS 2 lembar (bila ada)
                  </li>
                </ol>
              </div>
            </div>
          </SlideDownServiceDesktop>
          <SlideDownServiceDesktop
            id={4}
            active={active}
            setActive={setActive}
            title="Pusat Bantuan Pendaftaran"
            no="03"
            first={false}
          >
            <div className="w-120 px-5 flex flex-col justify-start items-start gap-4 md:pr-20 md:py-6 md:gap-6">
              <p className="text-sm text-primary-blue font-semibold md:text-xl">
                Persyaratan
              </p>
              <div className="w-full pl-2 flex flex-col justify-start items-start gap-4">
                <ol className="list-disc list-outside px-5 space-y-1">
                  <li className="text-primary-blue text-lg">
                    Mengisi formulir pendaftaran (online/offline)
                  </li>
                  <li className="text-primary-blue text-lg">
                    Foto berwarna (3x4) 4 lembar
                  </li>
                  <li className="text-primary-blue text-lg">
                    FC. Akta Kelahiran
                  </li>
                  <li className="text-primary-blue text-lg">
                    FC. Kartu Keluarga 3 lembar
                  </li>
                  <li className="text-primary-blue text-lg">
                    FC. KTP orang tua, masing-masing 2 lembar
                  </li>
                  <li className="text-primary-blue text-lg">
                    FC. KIP/KTS 2 lembar (bila ada)
                  </li>
                </ol>
              </div>
            </div>
          </SlideDownServiceDesktop>
        </>
      )}
    </div>
  );
};

// slide down non desktop

type SlideDownServiceProps = {
  id: number;
  active: number;
  setActive: (id: number) => void;
  title: string;
  no: string;
  first: boolean;
  children: ReactNode;
};

const SlideDownService: FC<SlideDownServiceProps> = memo(({ ...props }) => {
  const isShow = props.active === props.id;
  const handleClick = () => {
    props.setActive(isShow ? 1 : props.id);
  };
  return (
    <div
      className="w-full flex flex-col justify-start items-center gap-4 pt-4"
      onClick={handleClick}
    >
      {!props.first && (
        <div className="w-full h-[0.7px] bg-secondary-blue"></div>
      )}
      <div></div>
      <div className="w-full flex flex-row justify-between items-center gap-4 px-5">
        <p className="text-sm text-primary-blue md:text-xl">{props.title}</p>
        <p className="text-sm text-primary-blue md:text-xl">{props.no}</p>
      </div>
      <div
        className={`w-full overflow-hidden transition-all duration-800 ease-in-out ${
          isShow ? "max-h-80  opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {props.children}
      </div>
    </div>
  );
});

// slide down desktop

type SlideDownServiceDesktopProps = {
  id: number;
  active: number;
  setActive: (id: number) => void;
  title: string;
  no: string;
  first: boolean;
  children: ReactNode;
};

const SlideDownServiceDesktop: FC<SlideDownServiceDesktopProps> = memo(
  ({ ...props }) => {
    const isShow = props.active === props.id;
    const handleClick = () => {
      props.setActive(isShow ? 1 : props.id);
    };
    return (
      <div
        className={`${
          isShow ? "w-[78%] h-full" : "w-[8%]"
        }  transition-all duration-800 ease-in-out shrink-0 h-full flex flex-row justify-start items-center gap-2 cursor-pointer`}
        onClick={handleClick}
      >
        {!props.first && (
          <div className="h-full w-[0.7px] bg-secondary-blue"></div>
        )}
        <div></div>
        <div className="h-full w-[8%] flex flex-col justify-between items-center gap-4 px-5 py-6">
          <p className="text-sm text-primary-blue md:text-xl">{props.no}</p>
          <div className={`h-full flex flex-col justify-center items-center `}>
            <p className="text-lg  text-primary-blue transform -rotate-90 w-[280%]">
              {props.title}
            </p>
          </div>
        </div>
        <div
          className={`h-full overflow-hidden transition-all duration-800 ease-in-out ${
            isShow
              ? "max-w-[78%] h-full  opacity-100"
              : "max-w-0 opacity-0 h-full"
          }`}
        >
          {props.children}
        </div>
      </div>
    );
  }
);

export default ServiceInfo;
