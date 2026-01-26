import { useEffect, useState, type FC } from "react";
import HeaderDashboard from "../../components/HeaderDashboard";
import ComponentFilterAndButtonAdd from "../../components/ComponentFilterAndButtonAdd";
import useSearch from "../../hooks/useSearch";
import HeaderData from "../../components/HeaderData";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useHandlePage } from "../../hooks/useHandlePage";
import CardData from "../../components/CardData";
import { handleActionDelete } from "../../utils/sweetalert/delete";
import Pagination from "../../components/Pagination";
import ModalContainer from "../../components/ModalContainer";
import ModalDetailData from "../../components/ModalDetailData";
import NoData from "../../components/NoData";
import useNotifSuccess from "../../hooks/useNotifSuccess";
import type {
  CategoryPrestasi,
  MoreFilter,
  PrestasiFilterKey,
  ResponsePrestasiType,
  TahunType,
} from "../../models/prestasi-model";
import { PrestasiService } from "../../services/prestasi.service";
import { useSearchParams } from "react-router-dom";

const PrestasiDashboardPage: FC = () => {
  // ==========================
  // NOTIF SUCCESS
  // ==========================
  useNotifSuccess();

  // ==========================
  // QUERY CLIENT
  // ==========================
  const queryClient = useQueryClient();

  // ==========================
  // SEARCH PARAMS
  // ==========================
  const [searchParams, setSearchParams] = useSearchParams();

  const [isMoreFilter, setIsMoreFilter] = useState<MoreFilter>(() => {
    const categoryParam = searchParams.get("category_prestasi");
    const jenisKelaminParam = searchParams.get("jenisKelamin");
    const tahunPrestasiParam = searchParams.get("tahun_prestasi");

    // validasi category_prestasi
    const category = [
      "internasional",
      "nasional",
      "provinsi",
      "kabupaten",
      "kecamatan",
    ].includes(categoryParam as string)
      ? (categoryParam as CategoryPrestasi)
      : undefined;

    // validasi jenis_kelamin
    const jenisKelamin =
      jenisKelaminParam === "laki_laki" || jenisKelaminParam === "perempuan"
        ? (jenisKelaminParam as "laki_laki" | "perempuan")
        : undefined;

    // validasi tahun_prestasi
    const validTahun: TahunType[] = [
      2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016,
      2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028,
      2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040,
    ];

    const tahunNumber = Number(tahunPrestasiParam);
    const tahun =
      tahunPrestasiParam && validTahun.includes(tahunNumber as TahunType)
        ? (tahunNumber as TahunType)
        : undefined;

    return {
      category_prestasi: category,
      jenisKelamin: jenisKelamin,
      tahun_prestasi: tahun,
    };
  });
  // ==========================
  // HANDLE SET MORE FILTER
  // ==========================
  const handleSetMoreFilter = <K extends keyof MoreFilter>(
    key: K,
    value: MoreFilter[K],
  ) => {
    setIsMoreFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ==========================
  // SYNC STATE KE URL PARAMS
  // ==========================
  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());

      // category_prestasi
      if (isMoreFilter.category_prestasi)
        newParams.set("category_prestasi", isMoreFilter.category_prestasi);
      else newParams.delete("category_prestasi");

      // jenis_kelamin
      if (isMoreFilter.jenisKelamin)
        newParams.set("jenisKelamin", isMoreFilter.jenisKelamin);
      else newParams.delete("jenisKelamin");

      // tahun_prestasi
      if (isMoreFilter.tahun_prestasi)
        newParams.set("tahun_prestasi", isMoreFilter.tahun_prestasi.toString());
      else newParams.delete("tahun_prestasi");

      return newParams;
    });
  }, [isMoreFilter]);

  // ==========================
  // SPECIFIC FILTER HANDLERS
  // ==========================
  const handleFilterJenisKelamin = (
    value: "laki_laki" | "perempuan" | undefined,
  ) => {
    handleSetMoreFilter("jenisKelamin", value);
  };

  const handleFilterCategoryAndTahunPrestasi = <K extends PrestasiFilterKey>(
    key: K,
    value: MoreFilter[K],
  ) => {
    handleSetMoreFilter(key, value);
  };

  // ==========================
  // MODAL STATE
  // ==========================
  const [isModal, setIsModal] = useState<{
    active: boolean;
    data: ResponsePrestasiType | undefined;
  }>({ active: false, data: undefined });

  // ==========================
  // PAGE & SEARCH
  // ==========================
  const { handleChangePage, page } = useHandlePage();
  const { handleSearch, isSearch } = useSearch();
  const [debouncedSearch, setDebouncedSearch] = useState<string>(isSearch);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(isSearch), 700);
    return () => clearTimeout(timer);
  }, [isSearch]);

  // ==========================
  // USE QUERY
  // ==========================
  const { data: prestasi, isLoading } = useQuery({
    queryKey: [
      "prestasiForDashboard",
      page,
      debouncedSearch,
      isMoreFilter.category_prestasi?.toLocaleLowerCase(),
      isMoreFilter.jenisKelamin,
      isMoreFilter.tahun_prestasi,
    ],
    queryFn: () =>
      PrestasiService.read({
        page: page.toString(),
        search: debouncedSearch,
        category_prestasi: isMoreFilter.category_prestasi,
        jenis_kelamin: isMoreFilter.jenisKelamin,
        tahun_prestasi: isMoreFilter.tahun_prestasi,
      }),
    refetchOnWindowFocus: false,
  });

  // ==========================
  // HANDLE DELETE
  // ==========================
  const handleDelete = async (id: number) => {
    const result = await handleActionDelete(id, PrestasiService.delete);
    if (!result) return;

    setIsModal({ active: false, data: undefined });

    queryClient.invalidateQueries({ queryKey: ["prestasiForDashboard"] });
  };

  return (
    <main className="w-full flex flex-col justify-start items-center relative overflow-hidden lg:pt-4 lg:h-full px-4">
      {/* header page */}
      <HeaderDashboard
        title="Data Prestasi"
        subTitle="Pusat pengelolaan data prestasi"
        tanggal={true}
      />

      {/* content */}
      <div className="w-full mt-8 flex flex-col justify-start items-center lg:mt-12">
        {/* component filter and button add */}
        <ComponentFilterAndButtonAdd
          searchValue={isSearch}
          handleSearch={handleSearch}
          handleFilterJenisKelamin={handleFilterJenisKelamin}
          handleFilterCategoryAndTahunPrestasi={
            handleFilterCategoryAndTahunPrestasi
          }
          linkAdd="/dashboard/prestasi/tambah"
        />

        {/* header data */}
        <HeaderData
          header={["Nama", "Tingkat", "Tahun Prestasi", "Jenis Kelamin"]}
          headerSizeSmall="Nama"
        />

        {/* card data */}
        <div className="w-full flex flex-col justify-start items-start gap-4 mt-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-13 bg-gray-300 rounded-lg animate-pulse"
              />
            ))
          ) : prestasi?.success && prestasi?.data?.data.length > 0 ? (
            prestasi?.data?.data.map((item, index) => (
              <CardData
                key={item.id}
                data={[
                  item.nama,
                  item.category_prestasi === "nasional"
                    ? "Nasional"
                    : item.category_prestasi === "provinsi"
                      ? "Provinsi"
                      : item.category_prestasi === "kabupaten"
                        ? "Kabupaten"
                        : item.category_prestasi === "kecamatan"
                          ? "Kecamatan"
                          : "Internasional",
                  item.tahun_prestasi.toString(),
                  item.jenis_kelamin === "laki_laki"
                    ? "Laki-laki"
                    : "Perempuan",
                ]}
                dataSizeSmall={item.nama}
                linkUpdate={`/dashboard/prestasi/edit/${item.id}`}
                index={index + (prestasi.data?.meta.pageSize ?? 0) * (page - 1)}
                handleOpenModal={() => setIsModal({ active: true, data: item })}
                handleDelete={() => handleDelete(item.id)}
              />
            ))
          ) : (
            <NoData />
          )}
        </div>
      </div>

      {/* showing */}
      <Pagination
        totalData={prestasi?.success ? prestasi?.data?.meta.totalData : 0}
        totalPage={prestasi?.success ? prestasi?.data?.meta.totalPage : 0}
        currentPage={prestasi?.success ? prestasi?.data?.meta.currentPage : 1}
        handlePageSingle={handleChangePage}
        handlePage={() => {}}
      />

      {/* modal */}
      <ModalContainer fullWidth={true} active={isModal.active}>
        <ModalDetailData
          download={false}
          linkUpdate={`/dashboard/prestasi/edit/${isModal.data?.id}`}
          size="sm"
          handleDelete={() => handleDelete(isModal.data?.id || 0)}
          img={isModal.data?.photo}
          pathImg="prestasi"
          data={[
            {
              label: "Nama",
              value: isModal.data?.nama || "-",
            },
            {
              label: "Tingkat",
              value: `Tahun ${isModal.data?.category_prestasi}` || "-",
            },
            {
              label: "Jenis Kelamin",
              value:
                `${isModal.data?.jenis_kelamin === "laki_laki" ? "Laki-laki" : "Perempuan"}` ||
                "-",
            },
            {
              label: "Tahun Prestasi",
              value: `Tahun ${isModal.data?.tahun_prestasi}` || "-",
            },
            {
              label: "Deskripsi Prestasi",
              value: isModal.data?.prestasi || "-",
            },
          ]}
          handleClose={() => setIsModal({ active: false, data: undefined })}
        />
      </ModalContainer>
    </main>
  );
};

export default PrestasiDashboardPage;
