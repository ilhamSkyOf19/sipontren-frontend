import clsx from "clsx";
import { Calendar, ChevronDown, Search, UsersRound } from "lucide-react";
import { useRef, useState, type FC, type RefObject } from "react";
import {
  formatDateID,
  formatDateNumber,
  getTodayLocal,
  isValidDate,
} from "../../utils/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutSide";

// time

type Props = {
  handleFilter?: (
    newValues: Partial<{ page: number; from: string; to: string }>,
  ) => void;
  handleSearch?: (search: string) => void;
  handleFilterJenisKelamin?: (
    jenisKelamin: "laki_laki" | "perempuan" | undefined,
  ) => void;
  searchValue: string;
  linkAdd?: string;
};

const ComponentFilterAndButtonAdd: FC<Props> = ({
  handleFilter,
  handleSearch,
  searchValue,
  handleFilterJenisKelamin,
  linkAdd,
}) => {
  // get search params
  const [searchParams] = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  // state modal filter
  const [isModalFilterDate, setIsModalFilterDate] = useState<boolean>(false);

  // state jenis kelamin
  const [isModalJenisKelamin, setIsModalJenisKelamin] = useState<{
    active: boolean;
    jenisKelamin: "laki_laki" | "perempuan" | undefined;
  }>({ active: false, jenisKelamin: undefined });

  // handle jenis kelamin
  const handleJenisKelamin = (value: "laki_laki" | "perempuan" | undefined) => {
    // set jenis kelamin
    handleFilterJenisKelamin?.(value);

    // close
    setIsModalJenisKelamin({ active: false, jenisKelamin: value });
  };

  // handle close modal filter
  const handleOpenModalFilterDate = () => {
    setIsModalFilterDate((prev) => !prev);
  };

  // ref modal filter jenis kelamin
  const refFilterJenisKelamin = useRef<HTMLDivElement>(null);
  const refButtonJenisKelamin = useRef<HTMLButtonElement>(null);

  // ref input
  const refInputDateFrom = useRef<HTMLInputElement>(null);
  const refInputDateTo = useRef<HTMLInputElement>(null);

  // ref modal filter any date
  const refFilterAnyDate = useRef<HTMLDivElement>(null);
  const refButtonAnyDate = useRef<HTMLButtonElement>(null);

  // handle set date from
  const handleSetDate = (type: "from" | "to", value: string) => {
    if (type === "from") {
      handleFilter?.({ from: value });
    } else {
      handleFilter?.({ to: value });
    }
  };

  // handle reset filter
  const handleResetFilter = () => {
    // set is date
    handleFilter?.({
      from: getTodayLocal(),
      to: getTodayLocal(),
    });

    // close modal
    setIsModalFilterDate(false);
  };

  // use click outside
  useClickOutside({
    refs: [refFilterAnyDate, refButtonAnyDate],
    onOutsideClick: () => setIsModalFilterDate(false),
  });

  // use click outside
  useClickOutside({
    refs: [refFilterJenisKelamin, refButtonJenisKelamin],

    onOutsideClick: () =>
      setIsModalJenisKelamin((prev) => ({
        ...prev,
        active: false,
      })),
  });

  // navigate
  const navigate = useNavigate();

  return (
    <div className="w-full h-auto flex flex-col justify-between items-start gap-4 jg:flex-row lg:h-12 lg:items-center lg:flex-row">
      {/* search */}
      <div className="w-full py-3 flex flex-row justify-start items-center px-4 bg-primary-white rounded-lg gap-3 border border-primary-black/15 transition-all duration-300 ease-in-out focus-within:shadow-[0_2px_10px_1px_rgba(0,0,0,0.05)] focus-within:-translate-y-1 lg:flex-1 lg:h-full lg:py-0">
        {/* icon */}
        <Search />
        {/* input */}
        <input
          type="text"
          name={"search"}
          id="search"
          value={searchValue}
          onChange={(e) => handleSearch?.(e.target.value)}
          placeholder={"Cari data ..."}
          className="w-full h-full border-none outline-none text-base placeholder:text-sm font-medium"
        />
      </div>

      {/* filter */}
      <div
        className={clsx(
          " h-12 flex-row justify-start items-center gap-2 relative lg:flex-2 lg:h-full lg:justify-end",
          handleFilter && handleFilterJenisKelamin ? "flex" : "hidden",
        )}
      >
        {/* filter jenis kelamin */}
        <div className="relative h-full">
          {handleFilterJenisKelamin && (
            <>
              <button
                ref={refButtonJenisKelamin}
                onClick={() =>
                  setIsModalJenisKelamin((prev) => ({
                    ...prev,
                    active: !prev.active,
                  }))
                }
                type="button"
                className="px-4 h-full flex flex-row justify-start items-center bg-white shadow-[0_2px_10px_1px_rgba(0,0,0,0.05)] rounded-lg gap-2"
              >
                <UsersRound size={24} />
                <span className="text-sm font-medium text-left hidden lg:block">
                  {isModalJenisKelamin.jenisKelamin
                    ? isModalJenisKelamin.jenisKelamin === "laki_laki"
                      ? "Laki-laki"
                      : "Perempuan"
                    : "Jenis Kelamin"}
                </span>

                <ChevronDown
                  size={24}
                  className={clsx(
                    "transition-transform duration-200 ease-in-out",
                    isModalJenisKelamin.active ? "-rotate-180" : "rotate-0",
                  )}
                />
              </button>

              {/* modal jenis kelamin */}
              <div
                ref={refFilterJenisKelamin}
                className={clsx(
                  " w-[40vw] bg-white shadow-[0_0_20px_2px_rgba(0,0,0,0.1)] flex flex-col justify-start items-start absolute top-[110%] z-40 rounded-md transition-all duration-300 ease-in-out overflow-hidden overflow-y-scroll scrollbar-hidden md:w-40",
                  isModalJenisKelamin.active
                    ? "max-h-43"
                    : "max-h-0 shadow-none",
                )}
              >
                {/* choose laki laki */}
                <button
                  type="button"
                  onClick={() => handleJenisKelamin("laki_laki")}
                  className={clsx(
                    "w-full flex flex-row justify-start items-center gap-2 px-4 py-3 hover:bg-primary-black/10 transition-all duration-200 ease-in-out",
                    isModalJenisKelamin.jenisKelamin === "laki_laki" &&
                      "bg-primary-black/10",
                  )}
                >
                  <span className="text-sm font-medium w-full text-center">
                    Laki-laki
                  </span>
                </button>

                {/* choose perempuan */}
                <button
                  type="button"
                  onClick={() => handleJenisKelamin("perempuan")}
                  className={clsx(
                    "w-full flex flex-row justify-start items-center gap-2 px-4 py-3 hover:bg-primary-black/10 transition-all duration-200 ease-in-out",
                    isModalJenisKelamin.jenisKelamin === "perempuan" &&
                      "bg-primary-black/10",
                  )}
                >
                  <span className="text-sm font-medium w-full text-center">
                    Perempuan
                  </span>
                </button>

                {/* choose reset */}
                <button
                  type="button"
                  onClick={() => handleJenisKelamin(undefined)}
                  className="w-full flex flex-row justify-start items-center gap-2 px-4 py-3 hover:bg-primary-black/10 transition-all duration-200 ease-in-out"
                >
                  <span className="text-sm font-medium w-full text-center">
                    Reset
                  </span>
                </button>
              </div>
            </>
          )}
        </div>

        <div className="relative h-full flex flex-row justify-start items-center">
          {/* filter any date  */}
          {handleFilter && (
            <>
              <button
                ref={refButtonAnyDate}
                onClick={() => handleOpenModalFilterDate()}
                type="button"
                className="px-4 h-full flex flex-row justify-start items-center bg-white shadow-[0_2px_10px_1px_rgba(0,0,0,0.05)] rounded-lg gap-2"
              >
                <Calendar size={24} />
                <span className="text-sm font-medium hidden lg:block">
                  Filter Tanggal
                </span>

                <ChevronDown
                  size={24}
                  className={clsx(
                    "transition-transform duration-200 ease-in-out",
                    isModalFilterDate ? "-rotate-180" : "rotate-0",
                  )}
                />
              </button>

              <div className=" flex-row justify-start items-center gap-2 ml-4 h-full px-4 bg-white shadow-[0_2px_10px_1px_rgba(0,0,0,0.05)] rounded-lg hidden lg:flex">
                {(from && to && from === to) || (!from && !to) ? (
                  <p className="text-sm font-medium">
                    {formatDateID(
                      isValidDate(from)
                        ? new Date(from as string)
                        : new Date(getTodayLocal()),
                    )}
                  </p>
                ) : (
                  <>
                    <p className="text-sm font-medium">
                      {formatDateID(
                        isValidDate(from)
                          ? new Date(from ?? getTodayLocal())
                          : new Date(getTodayLocal()),
                      )}
                    </p>{" "}
                    -{" "}
                    <p className="text-sm font-medium">
                      {formatDateID(
                        isValidDate(to)
                          ? new Date(to ?? getTodayLocal())
                          : new Date(getTodayLocal()),
                      )}
                    </p>
                  </>
                )}
              </div>

              <div
                ref={refFilterAnyDate}
                className={clsx(
                  "w-[50vw] h-60 md:h-43 bg-white shadow-[0_0_20px_2px_rgba(0,0,0,0.1)] flex flex-col justify-start items-start absolute top-[110%] z-40 rounded-md transition-all duration-300 ease-in-out overflow-hidden overflow-y-scroll scrollbar-hidden md:w-80",
                  isModalFilterDate ? "max-h-60" : "max-h-0 shadow-none",
                )}
              >
                <div className="w-full h-full flex flex-col justify-start items-center py-4 px-4 gap-2">
                  {/* date */}
                  <div className="w-full flex flex-col gap-4 md:flex-row justify-start items-center md:gap-1">
                    {/* date from */}
                    <BoxInputDate
                      type="from"
                      refInput={refInputDateFrom}
                      handleDate={handleSetDate}
                      label={from ?? ""}
                      to={to ?? ""}
                    />
                    <BoxInputDate
                      type="to"
                      refInput={refInputDateTo}
                      handleDate={handleSetDate}
                      label={to ?? ""}
                      from={from ?? ""}
                    />
                  </div>

                  {/* button action */}
                  <div className="w-full flex flex-row justify-between items-center gap-3 mt-4">
                    {/* reset */}
                    <button
                      onClick={() => handleResetFilter()}
                      type="button"
                      className="py-2 flex-1 border border-primary-blue rounded-sm hover:bg-primary-black/10 transition-all duration-200 ease-in-out"
                    >
                      <span className="text-sm font-medium capitalize">
                        reset
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* button add */}
      {linkAdd && (
        <button
          type="button"
          onClick={() => {
            navigate(linkAdd, {
              state: {
                from: "state",
              },
            });
          }}
          className="px-6 py-2.5 capitalize rounded-lg bg-primary-green text-primary-white font-medium text-base relative before:absolute before:content-[''] before:inset-0 before:bg-primary-black/10 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-200 before:ease-in-out"
        >
          tambah
        </button>
      )}
    </div>
  );
};

// box input date
type BoxInputDateProps = {
  type: "from" | "to";
  refInput: RefObject<HTMLInputElement | null>;
  handleDate: (type: "from" | "to", date: string) => void;
  label: string;
  to?: string;
  from?: string;
};
const BoxInputDate: FC<BoxInputDateProps> = ({
  handleDate,
  label,
  refInput,
  type,
  to,
  from,
}) => {
  return (
    <button
      type="button"
      onClick={() => refInput.current?.showPicker()}
      className="w-full flex flex-col justify-start items-start gap-1"
    >
      <span className="flex-1 font-medium text-xs capitalize">
        {type === "from" ? "dari" : "sampai"}
      </span>
      {/* input date */}
      <div className="w-full h-8 border border-primary-blue flex items-center px-2 gap-2 py-5 rounded-sm relative">
        <input
          ref={refInput}
          type="date"
          className="absolute opacity-0"
          onChange={(e) => {
            const value = e.target.value;
            if (!value) return;
            handleDate(type, getTodayLocal(new Date(value)));
          }}
          max={to ? to : getTodayLocal()}
          min={from && from}
        />

        {/* icon */}
        <div className="z-20">
          <Calendar size={18} />
        </div>

        {/* label */}
        <div className="flex-1 h-8 z-20 flex flex-row justify-start items-center">
          <span className="text-xs font-medium z-20">
            {formatDateNumber(label ? new Date(label) : new Date())}
          </span>
        </div>
      </div>
    </button>
  );
};

export default ComponentFilterAndButtonAdd;
