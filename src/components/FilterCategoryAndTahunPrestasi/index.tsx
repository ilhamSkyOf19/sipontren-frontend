import clsx from "clsx";
import { CalendarDays, ChevronDown, Trophy } from "lucide-react";
import { useRef, useState, type FC, type ReactNode } from "react";
import type {
  CategoryPrestasi,
  MoreFilter,
  PrestasiFilterKey,
  TahunType,
} from "../../models/prestasi-model";
import useClickOutside from "../../hooks/useClickOutSide";
import { useSearchParams } from "react-router-dom";

// choose list
const tahunPrestasiList: number[] = [
  2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
  2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
  2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040,
];

// tingkat list
const tingkatList: CategoryPrestasi[] = [
  "internasional",
  "nasional",
  "provinsi",
  "kabupaten",
  "kecamatan",
];

type Props = {
  handleFilterCategoryAndTahunPrestasi: <K extends PrestasiFilterKey>(
    key: K,
    value: MoreFilter[K],
  ) => void;
};

const FilterCategoryAndTahunPrestasi: FC<Props> = ({
  handleFilterCategoryAndTahunPrestasi,
}) => {
  // ambil search params
  const [searchParams] = useSearchParams();

  // ==========================
  // STATE MODAL CATEGORY PRESTASI
  // ==========================
  const [isModalCategoryPrestasi, setIsModalCategoryPrestasi] = useState<{
    active: boolean;
    categoryPrestasi: CategoryPrestasi | undefined;
  }>(() => {
    const param = searchParams.get("category_prestasi");
    if (
      param === "internasional" ||
      param === "nasional" ||
      param === "provinsi" ||
      param === "kabupaten" ||
      param === "kecamatan"
    ) {
      return { active: false, categoryPrestasi: param as CategoryPrestasi };
    }
    return { active: false, categoryPrestasi: undefined };
  });

  // ==========================
  // STATE MODAL TAHUN PRESTASI
  // ==========================
  const [isModalTahunPrestasi, setIsModalTahunPrestasi] = useState<{
    active: boolean;
    tahunPrestasi: number | undefined;
  }>(() => {
    const param = searchParams.get("tahun_prestasi");
    const tahun = param ? Number(param) : undefined;
    return { active: false, tahunPrestasi: tahun };
  });

  // ==========================
  // HANDLE MODAL CATEGORY PRESTASI
  // ==========================
  const handleModalCategoryPrestasi = () => {
    setIsModalCategoryPrestasi((prev) => ({
      ...prev,
      active: !prev.active,
    }));
  };

  // HANDLE PILIH CATEGORY PRESTASI
  const handleChooseCategoryPrestasi = (categoryPrestasi: CategoryPrestasi) => {
    handleFilterCategoryAndTahunPrestasi("category_prestasi", categoryPrestasi);

    setIsModalCategoryPrestasi((prev) => ({
      ...prev,
      active: false,
      categoryPrestasi,
    }));
  };

  // HANDLE RESET CATEGORY PRESTASI
  const handleResetCategoryPrestasi = () => {
    handleFilterCategoryAndTahunPrestasi("category_prestasi", undefined);

    setIsModalCategoryPrestasi((prev) => ({
      ...prev,
      active: false,
      categoryPrestasi: undefined,
    }));
  };

  // ==========================
  // HANDLE MODAL TAHUN PRESTASI
  // ==========================
  const handleModalTahunPrestasi = () => {
    setIsModalTahunPrestasi((prev) => ({
      ...prev,
      active: !prev.active,
    }));
  };

  // HANDLE PILIH TAHUN PRESTASI
  const handleChooseTahunPrestasi = (tahunPrestasi: number) => {
    handleFilterCategoryAndTahunPrestasi(
      "tahun_prestasi",
      tahunPrestasi as TahunType,
    );

    setIsModalTahunPrestasi((prev) => ({
      ...prev,
      active: false,
      tahunPrestasi,
    }));
  };

  // HANDLE RESET TAHUN PRESTASI
  const handleResetTahunPrestasi = () => {
    handleFilterCategoryAndTahunPrestasi("tahun_prestasi", undefined);

    setIsModalTahunPrestasi((prev) => ({
      ...prev,
      active: false,
      tahunPrestasi: undefined,
    }));
  };

  // ref modal filter category prestasi
  const refFilterCategoryPrestasi = useRef<HTMLDivElement>(null);
  const refButtonCategoryPrestasi = useRef<HTMLButtonElement>(null);

  // ref modal filter tahun prestasi
  const refFilterTahunPrestasi = useRef<HTMLDivElement>(null);
  const refButtonTahunPrestasi = useRef<HTMLButtonElement>(null);

  //   use click out side category prestasi
  useClickOutside({
    refs: [refFilterCategoryPrestasi, refButtonCategoryPrestasi],
    onOutsideClick: () =>
      setIsModalCategoryPrestasi((prev) => ({
        ...prev,
        active: false,
      })),
  });

  //   use click out side tahun prestasi
  useClickOutside({
    refs: [refFilterTahunPrestasi, refButtonTahunPrestasi],
    onOutsideClick: () =>
      setIsModalTahunPrestasi((prev) => ({
        ...prev,
        active: false,
      })),
  });

  return (
    <div className="flex flex-row justify-start items-center gap-4 h-full">
      {/* filter category prestasi */}
      <FilterButton
        buttonRef={refButtonCategoryPrestasi}
        icon={<Trophy className="w-5 lg:w-6" />}
        label={isModalCategoryPrestasi.categoryPrestasi || "Pilih Kategori"}
        active={isModalCategoryPrestasi.active}
        onClick={handleModalCategoryPrestasi}
      />

      <FilterModal
        modalRef={refFilterCategoryPrestasi}
        active={isModalCategoryPrestasi.active}
      >
        {tingkatList.map((tingkat) => (
          <button
            key={tingkat}
            onClick={() => handleChooseCategoryPrestasi(tingkat)}
            className={clsx(
              "w-full px-4 py-3 hover:bg-primary-black/10",
              isModalCategoryPrestasi.categoryPrestasi === tingkat &&
                "bg-primary-black/10",
            )}
          >
            <span className="capitalize text-sm font-medium w-full text-center">
              {tingkat}
            </span>
          </button>
        ))}

        <button
          onClick={handleResetCategoryPrestasi}
          className="w-full px-4 py-3 hover:bg-primary-black/10"
        >
          Reset
        </button>
      </FilterModal>

      {/*  filter tahun prestasi */}
      <div className="relative">
        <button
          ref={refButtonTahunPrestasi}
          onClick={() => handleModalTahunPrestasi()}
          type="button"
          className="lg:px-4 px-3 h-10 lg:h-12 flex flex-row justify-start items-center bg-white shadow-[0_2px_10px_1px_rgba(0,0,0,0.05)] rounded-lg gap-2"
        >
          <CalendarDays className="w-5 lg:w-6" />
          <span className="text-sm font-medium text-left hidden lg:block">
            {isModalTahunPrestasi.tahunPrestasi || "Pilih Tahun"}
          </span>

          <ChevronDown
            className={clsx(
              "transition-transform duration-200 ease-in-out w-5 lg:w-6",
              isModalTahunPrestasi.active ? "-rotate-180" : "rotate-0",
            )}
          />
        </button>

        {/* modal tahun prestasi */}
        <div
          ref={refFilterTahunPrestasi}
          className={clsx(
            " w-[40vw] bg-white shadow-[0_0_20px_2px_rgba(0,0,0,0.1)] flex flex-col justify-start items-start absolute top-[110%] z-40 rounded-md transition-all duration-300 ease-in-out overflow-hidden overflow-y-scroll scrollbar-hidden md:w-40",
            isModalTahunPrestasi.active ? "max-h-43" : "max-h-0 shadow-none",
          )}
        >
          {tahunPrestasiList.map((tahun, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleChooseTahunPrestasi(tahun)}
              className={clsx(
                "w-full flex flex-row justify-start items-center gap-2 px-4 py-3 hover:bg-primary-black/10 transition-all duration-200 ease-in-out",
                isModalTahunPrestasi.tahunPrestasi === tahun &&
                  "bg-primary-black/10",
              )}
            >
              <span className="capitalize text-sm font-medium w-full text-center">
                {tahun}
              </span>
            </button>
          ))}

          {/* choose reset */}
          <button
            type="button"
            onClick={() => handleResetTahunPrestasi()}
            className="w-full flex flex-row justify-start items-center gap-2 px-4 py-3 hover:bg-primary-black/10 transition-all duration-200 ease-in-out"
          >
            <span className="text-sm font-medium w-full text-center">
              Reset
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

type FilterButtonProps = {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
};

const FilterButton: FC<FilterButtonProps> = ({
  buttonRef,
  icon,
  label,
  active,
  onClick,
}) => {
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      type="button"
      className="h-10 px-3 lg:px-4 lg:h-12 flex flex-row items-center bg-white shadow-[0_2px_10px_1px_rgba(0,0,0,0.05)] rounded-lg gap-2"
    >
      {icon}

      <span className="text-sm font-medium hidden lg:block">{label}</span>

      <ChevronDown
        className={clsx(
          "transition-transform duration-200 w-5 lg:w-6",
          active ? "-rotate-180" : "rotate-0",
        )}
      />
    </button>
  );
};

type FilterModalProps = {
  modalRef: React.RefObject<HTMLDivElement | null>;
  active: boolean;
  children: ReactNode;
};

const FilterModal: FC<FilterModalProps> = ({ modalRef, active, children }) => {
  return (
    <div
      ref={modalRef}
      className={clsx(
        "absolute top-[110%] z-40 w-[40vw] md:w-40 bg-white rounded-md overflow-hidden overflow-y-scroll scrollbar-hidden transition-all duration-300",
        active
          ? "max-h-43 shadow-[0_0_20px_2px_rgba(0,0,0,0.1)]"
          : "max-h-0 shadow-none",
      )}
    >
      {children}
    </div>
  );
};

export default FilterCategoryAndTahunPrestasi;
