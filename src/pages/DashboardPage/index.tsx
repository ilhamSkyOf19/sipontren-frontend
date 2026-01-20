import { useRef, useState, type FC, type ReactNode } from "react";
import useNotifSuccess from "../../hooks/useNotifSuccess";
import HeaderDashboard from "../../components/HeaderDashboard";
import {
  Building2,
  Calendar,
  Mars,
  Newspaper,
  UsersRound,
  Venus,
} from "lucide-react";
import { Link } from "react-router-dom";
import BoxInputDateFilter from "../../components/BoxInputDateFilter";
import { formatDateID } from "../../utils/utils";
import useClickOutside from "../../hooks/useClickOutSide";
import clsx from "clsx";

const DashboardPage: FC = () => {
  // notification
  useNotifSuccess();

  return (
    <main className="w-full flex flex-col justify-start items-center relative overflow-hidden pb-48 lg:pt-4 px-4 lg:pb-32">
      {/* header */}
      <HeaderDashboard
        title="Dashboard"
        subTitle="Pusat pengelolaan data santri, alumni, dan informasi Pondok Pesantren."
        tanggal={true}
      />

      {/* content grid bento */}
      <div className="w-full min-h-screen grid grid-cols-1 grid-rows-4 lg:h-[110vh] lg:grid-cols-4 mt-8 gap-6">
        {/* card 1 */}
        <CardStudent />

        {/* ustad */}
        <div className="col-span-1 row-span-1 lg:col-span-2 lg:row-span-2 bg-primary-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-2xl py-3 px-5 flex flex-col justify-between items-start pb-4">
          <HeaderTitle
            icon={<UsersRound size={28} className="text-secondary-blue" />}
            title="Data Ustad"
          />
          <div className="w-full h-full flex flex-col justify-between items-start">
            {/* total data */}
            <TotalData lakiLaki={120} perempuan={230} />

            {/* action */}
            <div className="w-full flex flex-row justify-start items-start gap-3">
              <Link
                to={"/dashboard/ustad"}
                className="py-1.5 px-4 bg-secondary-blue rounded-sm mt-4 text-xs lg:text-sm text-primary-white hover:bg-primary-blue transition-all ease-in-out duration-300"
              >
                selengkapnya
              </Link>
            </div>
          </div>
        </div>

        {/* data alumni */}
        <div className="col-span-1 row-span-1 lg:col-span-2 lg:row-span-2 bg-primary-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-2xl py-3 px-5 flex flex-col justify-between items-start pb-4">
          <HeaderTitle
            icon={<UsersRound size={28} className="text-secondary-blue" />}
            title="Data Alumni"
          />
          <div className="w-full h-full flex flex-col justify-between items-start">
            {/* total data */}
            <TotalData lakiLaki={120} perempuan={230} />

            {/* action */}
            <div className="w-full flex flex-row justify-start items-start gap-3">
              <Link
                to={"/dashboard/alumni"}
                className="py-1.5 px-4 bg-secondary-blue rounded-sm mt-4 text-xs lg:text-sm text-primary-white hover:bg-primary-blue transition-all ease-in-out duration-300"
              >
                selengkapnya
              </Link>
            </div>
          </div>
        </div>

        {/* data berita */}
        <div className="col-span-1 row-span-1 lg:col-span-2 lg:row-span-2 bg-primary-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-2xl py-3 px-5 flex flex-col justify-between items-start pb-4">
          <HeaderTitle
            icon={<UsersRound size={28} className="text-secondary-blue" />}
            title="Data Alumni"
          />
          <div className="w-full h-full flex flex-col justify-between items-start">
            {/* total data */}
            <div className="w-full flex flex-col justify-start items-start mt-4">
              {/* total */}
              <h4 className="font-medium text-primary-black text-base">
                Total Data :
              </h4>

              <div className="w-full h-20 lg:h-28 mt-3 flex flex-row justify-start items-center gap-3">
                {/* laki laki */}
                <div className="w-full h-full bg-primary-white shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] rounded-md hover:-translate-y-1 transition-all ease-in-out duration-300 flex flex-col justify-start items-start p-3">
                  {/* title */}
                  <div className="w-full flex flex-row justify-between items-center">
                    <p className="text-xs lg:text-sm text-primary-black font-medium">
                      Berita
                    </p>

                    {/* icon */}
                    <Newspaper
                      size={24}
                      className="text-gray-400 hidden lg:block"
                    />
                  </div>

                  {/* total data */}
                  <span className="text-2xl lg:text-3xl font-semibold text-secondary-blue lg:mt-3">
                    120
                  </span>
                </div>

                {/* perempuan */}
                <div className="w-full h-full bg-primary-white shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] rounded-md hover:-translate-y-1 transition-all ease-in-out duration-300 flex flex-col justify-start items-start p-3">
                  {/* title */}
                  <div className="w-full flex flex-row justify-between items-center">
                    <p className="text-xs lg:text-sm text-primary-black font-medium">
                      Artikel
                    </p>

                    {/* icon */}
                    <Newspaper
                      size={24}
                      className="text-secondary-blue hidden lg:block"
                    />
                  </div>

                  {/* total data */}
                  <span className="text-2xl lg:text-3xl font-semibold text-secondary-blue lg:mt-3">
                    140
                  </span>
                </div>
              </div>
            </div>

            {/* action */}
            <div className="w-full flex flex-row justify-start items-start gap-3">
              <Link
                to={"/dashboard/alumni"}
                className="py-1.5 px-4 bg-secondary-blue rounded-sm mt-4 text-xs lg:text-sm text-primary-white hover:bg-primary-blue transition-all ease-in-out duration-300"
              >
                selengkapnya
              </Link>
            </div>
          </div>
        </div>

        {/* fasilitas */}
        <div className="lg:col-span-1 lg:row-span-1 bg-primary-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-2xl py-3 px-5 flex flex-col justify-between items-start pb-4">
          <HeaderTitle
            icon={<Building2 size={28} className="text-secondary-blue" />}
            title="Fasilitas"
          />
          <div className="w-full h-full flex flex-col justify-between items-start">
            <div className="w-full flex flex-row justify-start items-start gap-3">
              <h4 className="font-medium text-primary-black text-base mt-4">
                Total Fasilitas :
              </h4>

              <div className="flex flex-row justify-start items-end ">
                <h4 className="font-bold text-3xl mt-2 mb-6 text-secondary-blue">
                  6
                </h4>

                <span className="mb-6 text-sm text-primary-black lg:hidden">
                  / fasilitas
                </span>
              </div>
            </div>

            <Link
              to={"/dashboard/ustad"}
              className="py-1.5 px-4 bg-secondary-blue rounded-sm text-xs lg:text-sm text-primary-white hover:bg-primary-blue transition-all ease-in-out duration-300"
            >
              selengkapnya
            </Link>
          </div>
        </div>

        {/* activate psb */}
        <ActivePsb />
      </div>
    </main>
  );
};

// card student
const CardStudent: FC = () => {
  return (
    <div className="col-span-1 row-span-1 lg:col-span-2 lg:row-span-2 bg-primary-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-2xl py-3 px-5">
      {/* header */}
      <HeaderTitle
        icon={<UsersRound size={28} className="text-secondary-blue" />}
        title="Data Calon Santri"
      />

      {/* action  */}
      <div className="w-full flex flex-row justify-col lg:justify-between items-center gap-2 h-9 lg:h-11 mt-4">
        <div className="w-full h-full flex flex-row justify-start items-start gap-2">
          {/* button download */}
          <button
            type="button"
            className="text-sm bg-[#12501A] text-white h-full px-4 rounded-md font-medium hover:-translate-y-1 transition-all ease-in-out duration-300 z-10"
          >
            CLSX
          </button>
          {/* button pdf */}
          <button
            type="button"
            className="text-sm bg-[#d22e2e] text-white h-full px-4 rounded-md font-medium hover:-translate-y-1 transition-all ease-in-out duration-300 z-10"
          >
            PDF
          </button>

          <Link
            to={"/dashboard/ustad"}
            className="h-full px-4 bg-secondary-blue rounded-sm text-xs lg:text-sm text-primary-white flex flex-col justify-center items-center hover:-translate-y-1 transition-all ease-in-out duration-300 z-10"
          >
            selengkapnya
          </Link>
        </div>
      </div>

      {/* total data */}
      <TotalData lakiLaki={120} perempuan={230} />
    </div>
  );
};

// card active psb
const ActivePsb: FC = () => {
  // state modal perode date
  const [isModalPeriode, setIsModalPeriode] = useState<boolean>(false);

  // state periode
  const [periode, setPeriode] = useState<string>("");

  // // ref input
  const refInputDateFrom = useRef<HTMLInputElement>(null);
  const refInputDateTo = useRef<HTMLInputElement>(null);

  // // ref date
  const refPeriode = useRef<HTMLInputElement>(null);
  const refButtonPeriode = useRef<HTMLButtonElement>(null);

  // state filter
  const [isDate, setIsDate] = useState<{ from: string; to: string }>({
    from: "",
    to: "",
  });

  // handle set date from
  const handleSetDate = (type: "from" | "to", value: string) => {
    if (type === "from") {
      setIsDate({ ...isDate, from: value });
    } else {
      setIsDate({ ...isDate, to: value });
    }
  };

  // click out side
  useClickOutside({
    refs: [refPeriode, refButtonPeriode],
    onOutsideClick: () => {
      setIsModalPeriode(false);
    },
  });

  return (
    <div className="col-span-1 row-span-2 lg:col-span-3 lg:row-span-4 bg-primary-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-2xl py-3 px-5 flex flex-col justify-between lg:justify-start items-start pb-4">
      {/* header title */}
      <HeaderTitle
        title="Pendaftaran Santri Baru"
        icon={<UsersRound size={28} className="text-secondary-blue" />}
      />

      <div className="w-full h-full flex flex-col  lg:flex-row justify-end items-start lg:items-center mt-4 lg:gap-12 gap-4">
        <div className="w-full h-full lg:flex-1 flex flex-col justify-start items-start gap-4">
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <BoxInputDateFilter
              type="from"
              refInput={refInputDateFrom}
              handleDate={handleSetDate}
              label={isDate.from ?? ""}
              to={isDate.to ?? ""}
              noMax={true}
            />

            <BoxInputDateFilter
              type="to"
              refInput={refInputDateTo}
              handleDate={handleSetDate}
              label={isDate.to ?? ""}
              from={isDate.from ?? ""}
              noMax={true}
            />
          </div>

          {/* button submut */}
          <button
            type="button"
            className="text-white py-1.5 px-4 bg-secondary-blue text-sm rounded-sm capitalize hover:bg-primary-blue transition-all ease-in-out duration-300"
          >
            buat periode
          </button>
        </div>

        {/* action */}
        <div className="lg:flex-2 w-full h-full flex flex-col lg:flex-row justify-start items-start">
          <div className="flex-1 flex flex-col justify-start items-start">
            {/* title */}
            <h3 className="text-base font-medium text-primary-black">
              Aktifkan Pendaftaran
            </h3>

            {/* button pilih periode */}
            <div className="relative">
              <button
                ref={refButtonPeriode}
                onClick={() => setIsModalPeriode((prev) => !prev)}
                type="button"
                className={clsx(
                  "py-2 rounded-md px-2 lg:px-4 flex flex-row justify-start items-center bg-primary-white shadow-[0_4px_10px_2px_rgba(0,0,0,0.07)] gap-2 mt-2  transition-transform ease-in-out duration-300",
                  isModalPeriode
                    ? "-translate-y-0.5"
                    : "hover:-translate-y-0.5",
                )}
              >
                {/* icon */}
                <Calendar size={18} className="text-secondary-blue" />

                {/* label */}
                <span className="text-xs font-medium">
                  {periode ? formatDateID(new Date(periode)) : "Pilih Periode"}
                </span>
              </button>

              {/* modal periode */}
              <div
                ref={refPeriode}
                className={clsx(
                  "w-62 h-36 rounded-md bg-primary-white shadow-[0_0_10px_1px_rgba(0,0,0,0.07)] absolute left-0 top-[105%] overflow-hidden transition-all ease-in-out duration-300 z-10 overflow-y-scroll scrollbar-hidden",
                  isModalPeriode ? "max-h-36 " : "max-h-0 ",
                )}
              >
                {/* button */}
                <button
                  type="button"
                  onClick={() => {
                    setPeriode(formatDateID(new Date()));
                    setIsModalPeriode(false);
                  }}
                  className="py-4 px-3 w-full flex flex-row justify-between items-center hover:bg-gray-200 transition-all ease-in-out duration-300"
                >
                  {/* label 1 */}
                  <span className="text-xs font-medium">
                    {formatDateID(new Date())}
                  </span>
                  <span className="text-xs font-medium">-</span>
                  <span className="text-xs font-medium">
                    {formatDateID(new Date())}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPeriode(formatDateID(new Date()));
                    setIsModalPeriode(false);
                  }}
                  className="py-4 px-3 w-full flex flex-row justify-between items-center hover:bg-gray-200 transition-all ease-in-out duration-300"
                >
                  {/* label 1 */}
                  <span className="text-xs font-medium">
                    {formatDateID(new Date())}
                  </span>
                  <span className="text-xs font-medium">-</span>
                  <span className="text-xs font-medium">
                    {formatDateID(new Date())}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPeriode(formatDateID(new Date()));
                    setIsModalPeriode(false);
                  }}
                  className="py-4 px-3 w-full flex flex-row justify-between items-center hover:bg-gray-200 transition-all ease-in-out duration-300"
                >
                  {/* label 1 */}
                  <span className="text-xs font-medium">
                    {formatDateID(new Date())}
                  </span>
                  <span className="text-xs font-medium">-</span>
                  <span className="text-xs font-medium">
                    {formatDateID(new Date())}
                  </span>
                </button>
              </div>
            </div>

            {/* button active */}
            <button
              type="button"
              className={clsx(
                "mt-4 text-sm py-1.5 px-4 bg-secondary-blue text-white rounded-md",
                periode ? "flex" : "hidden",
              )}
            >
              Aktifkan
            </button>
          </div>

          {/* label */}
          <div className="lg:flex-1 w-full mt-12 lg:mt-0 h-full flex flex-col justify-center items-center">
            {/* h3 */}
            <h3 className="text-lg font-medium text-secondary-blue">
              Pendaftaran Ditutup
            </h3>
            <span className="text-xs text-primary-black text-center">
              Silahkan aktifkan pendaftaran untuk memulai pendaftaran santri
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// header title
type HeaderTitleProps = {
  title: string;
  icon: ReactNode;
};
const HeaderTitle: FC<HeaderTitleProps> = ({ icon, title }) => {
  return (
    <div className="w-full flex flex-row justify-between items-center pb-2 border-b border-b-primary-black/30">
      <h3 className="text-xl font-semibold text-secondary-blue">{title}</h3>

      {/* icon */}
      {icon}
    </div>
  );
};

// total data
type TotalDataProps = {
  lakiLaki: number;
  perempuan: number;
};
const TotalData: FC<TotalDataProps> = ({ lakiLaki, perempuan }) => {
  return (
    <div className="w-full flex flex-col justify-start items-start mt-4">
      {/* total */}
      <h4 className="font-medium text-primary-black text-base">Total Data :</h4>

      <div className="w-full h-20 lg:h-28 mt-3 flex flex-row justify-start items-center gap-3">
        {/* laki laki */}
        <div className="w-full h-full bg-primary-white shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] rounded-md hover:-translate-y-1 transition-all ease-in-out duration-300 flex flex-col justify-start items-start p-3">
          {/* title */}
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-xs lg:text-sm text-primary-black font-medium">
              Laki-laki
            </p>

            {/* icon */}
            <Mars size={24} className="text-secondary-blue hidden lg:block" />
          </div>

          {/* total data */}
          <span className="text-2xl lg:text-3xl font-semibold text-secondary-blue lg:mt-3">
            {lakiLaki}
          </span>
        </div>

        {/* perempuan */}
        <div className="w-full h-full bg-primary-white shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] rounded-md hover:-translate-y-1 transition-all ease-in-out duration-300 flex flex-col justify-start items-start p-3">
          {/* title */}
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-xs lg:text-sm text-primary-black font-medium">
              Perempuan
            </p>

            {/* icon */}
            <Venus size={24} className="text-pink-500 hidden lg:block" />
          </div>

          {/* total data */}
          <span className="text-2xl lg:text-3xl font-semibold text-secondary-blue lg:mt-3">
            {perempuan}
          </span>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
