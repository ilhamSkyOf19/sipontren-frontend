import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { PrestasiService } from "../../services/prestasi.service";
import { useNavigate, useParams } from "react-router-dom";
import NoData from "../../components/NoData";
import clsx from "clsx";
import type { ResponsePrestasiType } from "../../models/prestasi-model";
import ModalContainer from "../../components/ModalContainer";
import { UseFilter } from "../../hooks/useFilter";
import PrevNext from "../../components/PrevNext";

const PrestasiPage: FC = () => {
  // handle page
  const { page, handleFilter } = UseFilter();

  // state modal
  const [isModal, setIsModal] = useState<{
    active: boolean;
    data: ResponsePrestasiType | null;
  }>({
    active: false,
    data: null,
  });

  //   handle
  const handleModalActive = (data: ResponsePrestasiType) => {
    setIsModal({ active: true, data });
  };

  // window scroll
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get category-prestasi from params
  const { categoryPrestasi } = useParams() as {
    categoryPrestasi: "internasional" | "nasional" | "provinsi" | "kabupaten";
  };

  // query
  const { data: dataPrestasi, isLoading } = useQuery({
    queryKey: ["prestasiUser", page],
    queryFn: () =>
      PrestasiService.read({
        category_prestasi: categoryPrestasi,
        jenis_kelamin: undefined,
        page: page.toString(),
        search: undefined,
        tahun_prestasi: undefined,
      }),
    enabled: categoryPrestasi !== undefined,
    refetchOnWindowFocus: false,
  });

  //   navigation
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center overflow-hidden bg-primary-white pb-12">
      {/* header */}
      <div className="w-full flex flex-col justify-start items-center mt-12 relative">
        {/* header */}
        <h3 className="text-xl font-medium text-secondary-blue">Prestasi</h3>

        {/* back */}
        <button
          type="button"
          className="absolute left-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={26} className="text-primary-black" />
        </button>
      </div>

      {/* content */}
      <div className="w-full mt-8 flex flex-row flex-wrap justify-center items-start gap-6 px-4 relative">
        {isLoading ? (
          Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="w-70 h-120 shrink-0 bg-gray-300 rounded-lg flex flex-col justify-between items-center overflow-hidden animate-pulse"
            />
          ))
        ) : dataPrestasi?.success && dataPrestasi?.data.data.length > 0 ? (
          dataPrestasi.data.data.map((item, index) => (
            <div
              key={index}
              className="w-[88vw] lg:w-90 h-150 shrink-0 bg-primary-white shadow-[0_4px_10px_2px_rgba(0,0,0,0.1)] rounded-lg flex flex-col justify-between items-center overflow-hidden"
            >
              {/* img */}
              <div className="w-full flex-2 overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_API_BASE_IMG_URL}/prestasi/${item.photo}`}
                  alt="photo"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* label */}
              <div className="w-full flex-1 flex flex-col justify-start items-start px-3 py-3 gap-1">
                {/* name */}
                <LabelComponent label="Nama" value={item.nama} />

                {/* kategory */}
                <LabelComponent
                  label="Tingkat"
                  value={`${item.category_prestasi}`}
                  capitalize={true}
                />

                {/* tahun prestasi */}
                <LabelComponent
                  label="Tahun Prestasi"
                  value={`Tahun ${item.tahun_prestasi}`}
                />

                {/* jenis kelamin */}
                <LabelComponent
                  label="Jenis Kelamin"
                  value={`${item.jenis_kelamin === "laki_laki" ? "Laki-laki" : "Perempuan"}`}
                />

                {/* prestasi */}
                <LabelComponent
                  label="Prestasi"
                  value={`${item.prestasi.slice(0, 45)}${item.prestasi.length > 50 ? "..." : ""}`}
                />

                <div className="w-full flex flex-row justify-center items-center mt-3">
                  <button
                    type="button"
                    className="text-sm py-1.5 px-3 bg-secondary-blue text-primary-white rounded-md transition-all duration-200 ease-in-out hover:bg-primary-blue"
                    onClick={() => handleModalActive(item)}
                  >
                    lihat selengkapnya
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NoData />
        )}

        {/* prev & next */}
        {dataPrestasi?.success && (
          <PrevNext
            totalPage={dataPrestasi.data.meta.totalPage}
            handlePrev={() =>
              handleFilter({
                page: dataPrestasi.data.meta.currentPage - 1,
              })
            }
            handleNext={() =>
              handleFilter({
                page: dataPrestasi.data.meta.currentPage + 1,
              })
            }
            page={dataPrestasi.data.meta.currentPage}
          />
        )}
      </div>

      {/* modal container */}
      <ModalContainer active={isModal.active} fullWidth={true}>
        <div className="w-[90vw] h-[90vh] flex flex-col pt-4 px-6 relative">
          {/* button close  */}
          <button
            type="button"
            className="absolute top-2 right-2"
            onClick={() =>
              setIsModal({
                active: false,
                data: null,
              })
            }
          >
            <X size={26} className="text-primary-black" />
          </button>
          {/* HEADER (fixed) */}
          <div className="w-full flex flex-col items-center pb-2 border-b-2 border-b-primary-black shrink-0">
            <h3 className="text-lg font-semibold text-primary-black">
              Detail Prestasi
            </h3>
          </div>

          {/* SCROLL AREA */}
          <div className="flex-1 overflow-y-auto mt-6">
            {/* img */}
            <div className="w-full flex justify-center overflow-hidden h-80">
              <img
                src={`${import.meta.env.VITE_API_BASE_IMG_URL}/prestasi/${isModal.data?.photo}`}
                alt="photo"
                className="object-cover w-[80%] h-full rounded-md"
              />
            </div>

            {/* content */}
            <div className="w-full flex flex-col items-center mt-3 gap-2">
              <h3 className="text-base text-secondary-blue font-medium">
                {isModal.data?.nama}
              </h3>

              <LabelComponent
                label="Tingkat"
                value={isModal.data?.category_prestasi.toString()!}
                capitalize
              />

              <LabelComponent
                label="Jenis Kelamin"
                value={
                  isModal.data?.jenis_kelamin === "laki_laki"
                    ? "Laki-laki"
                    : "Perempuan"
                }
              />

              {/* prestasi */}
              <div className="w-full flex flex-col items-center mt-2 gap-2 pb-8">
                <p className="text-sm font-medium text-primary-black">
                  Deskripsi Prestasi
                </p>

                <p className="text-sm text-primary-black text-center">
                  {isModal.data?.prestasi}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ModalContainer>
    </main>
  );
};

// label
type LabelComponentProps = {
  label: string;
  value: string;
  capitalize?: boolean;
};
const LabelComponent: FC<LabelComponentProps> = ({
  label,
  value,
  capitalize,
}) => {
  return (
    <div className="w-full flex flex-row justify-start items-start gap-2">
      {/* label */}
      <div className="flex flex-row justify-between item-start flex-2">
        <p className="text-sm font-medium text-primary-black">{label}</p>
        <span className="text-sm font-semibold text-primary-black">:</span>
      </div>
      <p
        className={clsx(
          "text-sm text-primary-black flex-3",
          capitalize && "capitalize",
        )}
      >
        {value}
      </p>
    </div>
  );
};

export default PrestasiPage;
