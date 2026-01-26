import clsx from "clsx";
import { Calendar, ChevronDown, Search } from "lucide-react";
import { useRef, useState, type FC } from "react";
import { formatDateID, getTodayLocal, isValidDate } from "../../utils/utils";
import { useSearchParams } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutSide";
import ButtonAddText from "../ButtonAddText";
import FilterJenisKelamin from "../FilterJenisKelamin";
import BoxInputDateFilter from "../BoxInputDateFilter";
import FilterJenisSekolah from "../FilterJenisSekolah";
import type {
  MoreFilter,
  PrestasiFilterKey,
} from "../../models/prestasi-model";
import FilterCategoryAndTahunPrestasi from "../FilterCategoryAndTahunPrestasi";

// time

type Props = {
  // handle filter
  handleFilter?: (
    newValues: Partial<{ page: number; from: string; to: string }>,
  ) => void;

  // handle search
  handleSearch?: (search: string) => void;

  // handle filter jenis kelamin
  handleFilterJenisKelamin?: (
    jenisKelamin: "laki_laki" | "perempuan" | undefined,
  ) => void;

  // search value
  searchValue: string;

  // link add
  linkAdd?: string;

  // handle filter jenis sekolah
  handleFilterJenisSekolah?: (
    jenisSekolah: "SD" | "SMP" | "SMA" | undefined,
  ) => void;

  // handle filter category and tahun prestasi
  handleFilterCategoryAndTahunPrestasi?: <K extends PrestasiFilterKey>(
    key: K,
    value: MoreFilter[K],
  ) => void;
};

const ComponentFilterAndButtonAdd: FC<Props> = ({
  handleFilter,
  handleSearch,
  searchValue,
  handleFilterJenisKelamin,
  linkAdd,
  handleFilterJenisSekolah,
  handleFilterCategoryAndTahunPrestasi,
}) => {
  // ==========================
  // SEARCH PARAMS
  // ==========================
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") ?? getTodayLocal();
  const to = searchParams.get("to") ?? getTodayLocal();
  const jenisKelaminParam = searchParams.get("jenisKelamin") as
    | "laki_laki"
    | "perempuan"
    | undefined;
  const jenisSekolahParam = searchParams.get("jenisSekolah") as
    | "SD"
    | "SMP"
    | "SMA"
    | undefined;

  // ==========================
  // MODAL STATE
  // ==========================
  const [isModalFilterDate, setIsModalFilterDate] = useState(false);

  const [isModalJenisKelamin, setIsModalJenisKelamin] = useState({
    active: false,
    jenisKelamin: jenisKelaminParam,
  });

  const [isModalJenisSekolah, setIsModalJenisSekolah] = useState({
    active: false,
    jenisSekolah: jenisSekolahParam,
  });

  // ==========================
  // HANDLE FILTER
  // ==========================
  const handleJenisKelamin = (value: "laki_laki" | "perempuan" | undefined) => {
    handleFilterJenisKelamin?.(value);
    setIsModalJenisKelamin({ active: false, jenisKelamin: value });
  };

  const handleJenisSekolah = (value: "SD" | "SMP" | "SMA" | undefined) => {
    handleFilterJenisSekolah?.(value);
    setIsModalJenisSekolah({ active: false, jenisSekolah: value });
  };

  const handleOpenModalFilterDate = () => setIsModalFilterDate((prev) => !prev);

  const handleSetDate = (type: "from" | "to", value: string) => {
    handleFilter?.({ [type]: value });
  };

  const handleResetFilter = () => {
    handleFilter?.({ from: getTodayLocal(), to: getTodayLocal() });
    setIsModalFilterDate(false);
  };

  // ==========================
  // REFS
  // ==========================
  const refFilterJenisKelamin = useRef<HTMLDivElement>(null);
  const refButtonJenisKelamin = useRef<HTMLButtonElement>(null);
  const refFilterJenisSekolah = useRef<HTMLDivElement>(null);
  const refButtonJenisSekolah = useRef<HTMLButtonElement>(null);
  const refFilterAnyDate = useRef<HTMLDivElement>(null);
  const refButtonAnyDate = useRef<HTMLButtonElement>(null);
  const refInputDateFrom = useRef<HTMLInputElement>(null);
  const refInputDateTo = useRef<HTMLInputElement>(null);

  // ==========================
  // CLICK OUTSIDE
  // ==========================
  useClickOutside({
    refs: [refFilterAnyDate, refButtonAnyDate],
    onOutsideClick: () => setIsModalFilterDate(false),
  });

  useClickOutside({
    refs: [refFilterJenisKelamin, refButtonJenisKelamin],
    onOutsideClick: () =>
      setIsModalJenisKelamin((prev) => ({ ...prev, active: false })),
  });

  useClickOutside({
    refs: [refButtonJenisSekolah, refFilterJenisSekolah],
    onOutsideClick: () =>
      setIsModalJenisSekolah((prev) => ({ ...prev, active: false })),
  });

  return (
    <>
      <div className="w-full h-auto flex flex-col justify-between items-start gap-4 lg:gap-1 jg:flex-row lg:h-12 lg:items-center lg:flex-row">
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
            "flex-row justify-start items-center gap-2 relative lg:flex-3 lg:h-full lg:justify-end flex-wrap lg:flex-nowrap",
            handleFilter ||
              handleFilterJenisKelamin ||
              linkAdd ||
              handleFilterJenisSekolah
              ? "flex"
              : "hidden",
          )}
        >
          {/* filter jenis kelamin */}
          {handleFilterJenisKelamin && (
            <div className="relative h-full">
              <FilterJenisKelamin
                handleButtonJenisKelamin={() =>
                  setIsModalJenisKelamin((prev) => ({
                    ...prev,
                    active: !prev.active,
                  }))
                }
                refButtonJenisKelamin={refButtonJenisKelamin}
                refModalJenisKelamin={refFilterJenisKelamin}
                isModalJenisKelamin={isModalJenisKelamin}
                handleJenisKelamin={handleJenisKelamin}
              />
            </div>
          )}

          {handleFilterCategoryAndTahunPrestasi && (
            <div className="relative h-full">
              <FilterCategoryAndTahunPrestasi
                handleFilterCategoryAndTahunPrestasi={
                  handleFilterCategoryAndTahunPrestasi
                }
              />
            </div>
          )}

          {/* filter jenis sekolah */}
          {handleFilterJenisSekolah && (
            <div className="relative h-full">
              <FilterJenisSekolah
                handleButtonJenisSekolah={() =>
                  setIsModalJenisSekolah((prev) => ({
                    ...prev,
                    active: !prev.active,
                  }))
                }
                refButtonJenisSekolah={refButtonJenisSekolah}
                refModalJenisSekolah={refFilterJenisSekolah}
                isModalJenisSekolah={isModalJenisSekolah}
                handleJenisSekolah={handleJenisSekolah}
              />
            </div>
          )}

          <div className="relative h-full flex flex-row justify-start items-center gap-4">
            {/* button add */}
            {linkAdd && <ButtonAddText linkAdd={linkAdd} />}

            {/* filter any date  */}
            {handleFilter && (
              <>
                <button
                  ref={refButtonAnyDate}
                  onClick={() => handleOpenModalFilterDate()}
                  type="button"
                  className="lg:px-4 px-3 h-10 lg:h-12 flex flex-row justify-start items-center bg-white shadow-[0_2px_10px_1px_rgba(0,0,0,0.05)] rounded-lg gap-2"
                >
                  <Calendar className="w-5 lg:w-7" />
                  <span className="text-sm font-medium hidden lg:block">
                    Filter Tanggal
                  </span>

                  <ChevronDown
                    className={clsx(
                      "transition-transform duration-200 ease-in-out w-5 lg:w-7",
                      isModalFilterDate ? "-rotate-180" : "rotate-0",
                    )}
                  />
                </button>

                {/* modal filter */}
                <div
                  ref={refFilterAnyDate}
                  className={clsx(
                    "w-[50vw] h-60 md:h-43 bg-white shadow-[0_0_20px_2px_rgba(0,0,0,0.1)] flex flex-col justify-start items-start absolute lg:-left-full top-[110%] z-40 rounded-md transition-all duration-300 ease-in-out overflow-hidden overflow-y-scroll scrollbar-hidden md:w-80",
                    isModalFilterDate ? "max-h-60" : "max-h-0 shadow-none",
                    handleFilterJenisSekolah && "-left-full",
                  )}
                >
                  <div className="w-full h-full flex flex-col justify-start items-center py-4 px-4 gap-2">
                    {/* date */}
                    <div className="w-full flex flex-col gap-4 md:flex-row justify-start items-center md:gap-1">
                      {/* date from */}
                      <BoxInputDateFilter
                        type="from"
                        refInput={refInputDateFrom}
                        handleDate={handleSetDate}
                        label={from ? (isValidDate(from) ? from : "") : ""}
                        to={to ?? ""}
                      />
                      <BoxInputDateFilter
                        type="to"
                        refInput={refInputDateTo}
                        handleDate={handleSetDate}
                        label={to ? (isValidDate(to) ? to : "") : ""}
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
      </div>

      {handleFilter && (
        <div className="hidden lg:flex w-full flex-row justify-end items-center gap-4 mt-4">
          {/* keterangan */}
          <div className="flex-row justify-start items-center gap-2 h-12 px-4 bg-white shadow-[0_2px_10px_1px_rgba(0,0,0,0.05)] rounded-lg flex">
            <p className="font-medium text-sm">Data Dari :</p>
          </div>

          {/* keterangan */}
          <div className="flex-row justify-start items-center gap-2 h-12 px-4 bg-white shadow-[0_2px_10px_1px_rgba(0,0,0,0.05)] rounded-lg flex">
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
        </div>
      )}
    </>
  );
};

export default ComponentFilterAndButtonAdd;
