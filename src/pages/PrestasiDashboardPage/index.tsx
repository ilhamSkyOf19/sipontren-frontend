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
  MoreFilter,
  PrestasiFilterKey,
  ResponsePrestasiType,
} from "../../models/prestasi-model";
import { PrestasiService } from "../../services/prestasi.service";

const PrestasiDashboardPage: FC = () => {
  // notif succes
  useNotifSuccess();

  // use query client
  const queryClient = useQueryClient();

  // state filter
  const initialMoreFilter: MoreFilter = {
    category_prestasi: undefined,
    jenis_kelamin: undefined,
    tahun_prestasi: undefined,
  };

  const [isMoreFilter, setIsMoreFilter] =
    useState<MoreFilter>(initialMoreFilter);

  // handle set more filter
  const handleSetMoreFilter = <K extends keyof MoreFilter>(
    key: K,
    value: MoreFilter[K],
  ) => {
    setIsMoreFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // set jenis kelamin
  const handleFilterJenisKelamin = (
    value: "laki_laki" | "perempuan" | undefined,
  ) => {
    handleSetMoreFilter("jenis_kelamin", value);
  };

  // set category prestasi & tahun prestasi
  const handleFilterCategoryAndTahunPrestasi = <K extends PrestasiFilterKey>(
    key: K,
    value: (typeof initialMoreFilter)[K],
  ) => {
    handleSetMoreFilter(key, value);
  };

  // state modal
  const [isModal, setIsModal] = useState<{
    active: boolean;
    data: ResponsePrestasiType | undefined;
  }>({
    active: false,
    data: undefined,
  });

  // use handle page
  const { handleChangePage, page } = useHandlePage();

  //  use search
  const { handleSearch, isSearch } = useSearch();
  const [debouncedSearch, setDebouncedSearch] = useState<string>(isSearch);

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(isSearch), 700);
    return () => clearTimeout(timer);
  }, [isSearch]);

  //   use query
  const { data: prestasi, isLoading } = useQuery({
    queryKey: [
      "prestasiForDashboard",
      debouncedSearch,
      page,
      isMoreFilter.category_prestasi?.toLocaleLowerCase(),
      isMoreFilter.jenis_kelamin,
      isMoreFilter.tahun_prestasi,
    ],
    queryFn: () =>
      PrestasiService.read({
        page: page.toString(),
        search: debouncedSearch,
        category_prestasi: isMoreFilter.category_prestasi,
        jenis_kelamin: isMoreFilter.jenis_kelamin,
        tahun_prestasi: isMoreFilter.tahun_prestasi,
      }),
    refetchOnWindowFocus: false,
  });

  // handle delete
  const handleDelete = async (id: number) => {
    // handle delete
    const result = await handleActionDelete(id, PrestasiService.delete);

    if (!result) return;

    // close modal detail
    setIsModal({ active: false, data: undefined });

    // refresh
    queryClient.invalidateQueries({
      queryKey: ["prestasiForDashboard"],
    });
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
