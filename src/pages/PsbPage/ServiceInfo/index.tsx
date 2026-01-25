import { memo, useState, type FC, type ReactNode } from "react";
import useWindowSize from "../../../hooks/useWindowSize";
import { Link } from "react-router-dom";
const ServiceInfo = () => {
  const window = useWindowSize().width;

  const [active, setActive] = useState(1);

  const nomor = "6285896890881";
  const pesan = encodeURIComponent(
    "Assalamu'alaikum, saya ingin menanyakan informasi terkait pendaftaran di Pondok Pesantren. " +
      "Mohon info mengenai syarat dan prosedurnya. Terima kasih.",
  );
  return (
    <div className="w-full h-[90vh] border flex flex-col justify-start items-center rounded-4xl border-secondary-blue pb-0 overflow-hidden lg:flex-row lg:pb-0 lg:justify-start lg:px-6">
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
                <p className="text-sm text-primary-black md:text-lg">
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
            title="Pendaftaran Online"
            no="02"
            first={false}
          >
            <div className="w-full px-5 flex flex-col justify-start items-start gap-4 md:pr-20 md:py-6 md:gap-6">
              <div className="w-full flex flex-col justify-start items-start gap-1">
                {/* <TextSmBlue text="Waktu Pelayanan Pendaftaran" /> */}
                <p className="text-sm text-primary-black md:text-lg">
                  Mengisi formulir pendaftaran melalui website pondok, atau klik{" "}
                  {""}
                  <Link
                    to="/formulir"
                    className="text-secondary-blue underline"
                  >
                    di sini
                  </Link>
                </p>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-1">
                <p className="text-sm text-primary-black md:text-xl">
                  Cukup mengisi{" "}
                  <Link to={"/fomulir"} className="text-secondary-blue">
                    formulir pendaftaran
                  </Link>{" "}
                  yang sudah disediakan, dan unggah berkas sesuai dengan
                  ketentuan yang ada.
                </p>
              </div>
            </div>
          </SlideDownService>
          <SlideDownService
            id={3}
            active={active}
            setActive={setActive}
            title="Pendaftaran Offline"
            no="03"
            first={false}
          >
            <div className="w-full px-5 flex flex-col justify-start items-start gap-4 md:pr-20 md:py-6 md:gap-6">
              <div className="w-full flex flex-col justify-start items-start gap-1">
                {/* <TextSmBlue text="Waktu Pelayanan Pendaftaran" /> */}
                <p className="text-sm text-primary-black md:text-lg">
                  Silahkan datang ke pondok pesantren untuk melakukan
                  pendaftaran dengan membawa berkas pendaftaran.
                </p>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-1">
                <p className="text-sm text-primary-blue font-semibold md:text-xl">
                  Dokumen Pendaftaran
                </p>
                <div className="w-full pl-2 flex flex-col justify-start items-start gap-4">
                  <ol className="list-disc list-outside px-5 space-y-1">
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
            </div>
          </SlideDownService>
          <SlideDownService
            id={4}
            active={active}
            setActive={setActive}
            title="Pendaftaran Ulang"
            no="04"
            first={false}
          >
            <div className="w-full px-5 flex flex-col justify-start items-start gap-4 md:py-7">
              <p className="text-sm text-primary-blue font-semibold md:text-xl">
                Dokumen Pendaftaran Ulang
              </p>
              <div className="w-full pl-2 flex flex-col justify-start items-start gap-4">
                <ol className="list-disc list-outside px-5 space-y-1">
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
            id={5}
            active={active}
            setActive={setActive}
            title="Pusat Bantuan"
            no="05"
            first={false}
          >
            <div className="w-full px-5 flex flex-col justify-start items-start gap-2">
              <p className="text-sm text-primary-blue font-semibold md:text-xl">
                Hubungi Pusat Bantuan
              </p>
              <div className="w-full flex flex-col justify-start items-start pl-2 gap-4">
                <p className="text-sm text-primary-black md:text-xl">
                  {" "}
                  No Telepon / WhatsApp : <br />{" "}
                  <span className="text-secondary-blue font-medium">
                    +62 822-7821-9515
                  </span>
                </p>

                <a
                  href={`https://wa.me/${nomor}?text=${pesan}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-secondary-blue font-light md:text-xl lg:text-sm relative before:absolute before:w-full before:h-px before:bg-yellow-300 before:bottom-0 before:left-0 before:origin-left before:scale-x-0 before:transition-all before:duration-300 hover:before:scale-x-100 lg:font-normal"
                >
                  Silahkan klik disini
                </a>
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
  },
);

export default ServiceInfo;
