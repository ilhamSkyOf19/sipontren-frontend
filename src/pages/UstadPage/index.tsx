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
import type { ResponseUstadType } from "../../models/ustad-model";
import { UstadService } from "../../services/ustad.service";
import { formatDateID } from "../../utils/utils";

const UstadPage: FC = () => {
  // notif succes
  useNotifSuccess();

  // use query client
  const queryClient = useQueryClient();

  // state modal
  const [isModal, setIsModal] = useState<{
    active: boolean;
    data: ResponseUstadType | undefined;
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
  const { data: ustad, isLoading } = useQuery({
    queryKey: ["ustadForDashboard", debouncedSearch, page],
    queryFn: () =>
      UstadService.read({
        page: page.toString(),
        search: debouncedSearch,
      }),
    refetchOnWindowFocus: false,
  });

  // handle delete
  const handleDelete = async (id: number) => {
    // handle delete
    const result = await handleActionDelete(id, UstadService.delete);

    if (!result) return;

    // close modal detail
    setIsModal({ active: false, data: undefined });

    // refresh
    queryClient.invalidateQueries({
      queryKey: ["ustadForDashboard"],
    });
  };

  return (
    <main className="w-full flex flex-col justify-start items-center relative overflow-hidden lg:pt-4 lg:h-full px-4">
      {/* header page */}
      <HeaderDashboard
        title="Data Ustad"
        subTitle="Pusat pengelolaan data ustad"
        tanggal={true}
      />

      {/* content */}
      <div className="w-full mt-8 flex flex-col justify-start items-center lg:mt-12">
        {/* component filter and button add */}
        <ComponentFilterAndButtonAdd
          searchValue={isSearch}
          handleSearch={handleSearch}
          linkAdd="/dashboard/ustad/tambah"
        />

        {/* header data */}
        <HeaderData
          header={["Nama", "Jabatan", "Jenis Kelamin", "alamat", "No Telepon"]}
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
          ) : ustad?.success && ustad?.data?.data.length > 0 ? (
            ustad?.data?.data.map((item, index) => (
              <CardData
                key={item.id}
                data={[
                  item.name,
                  item.jabatan,
                  item.jenis_kelamin === "laki_laki"
                    ? "Laki-Laki"
                    : "Perempuan",
                  item.alamat,
                  item.no_telepon,
                ]}
                dataSizeSmall={item.name}
                linkUpdate={`/dashboard/ustad/edit/${item.id}`}
                index={index + (ustad.data?.meta.pageSize ?? 0) * (page - 1)}
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
        totalData={ustad?.success ? ustad?.data?.meta.totalData : 0}
        totalPage={ustad?.success ? ustad?.data?.meta.totalPage : 0}
        currentPage={ustad?.success ? ustad?.data?.meta.currentPage : 1}
        handlePageSingle={handleChangePage}
        handlePage={() => {}}
      />

      {/* modal */}
      <ModalContainer fullWidth={true} active={isModal.active}>
        <ModalDetailData
          download={false}
          linkUpdate={`/dashboard/ustad/edit/${isModal.data?.id}`}
          handleDelete={() => handleDelete(isModal.data?.id || 0)}
          img={isModal.data?.ustad_img}
          pathImg="ustad_img"
          data={[
            {
              label: "Nama",
              value: isModal.data?.name || "-",
            },
            {
              label: "Jenis Kelamin",
              value:
                isModal.data?.jenis_kelamin === "laki_laki"
                  ? "Laki-Laki"
                  : "Perempuan",
            },
            {
              label: "Jabatan",
              value: `Tahun ${isModal.data?.jabatan}` || "-",
            },
            {
              label: "Tempat Lahir",
              value: isModal.data?.tempat_lahir || "-",
            },
            {
              label: "Tanggal Lahir",
              value: isModal.data?.tanggal_lahir
                ? formatDateID(new Date(isModal.data?.tanggal_lahir))
                : "-",
            },
            {
              label: "no telepon",
              value: isModal.data?.no_telepon || "-",
            },
            {
              label: "alamat",
              value: isModal.data?.alamat || "-",
            },
          ]}
          handleClose={() => setIsModal({ active: false, data: undefined })}
        />
      </ModalContainer>
    </main>
  );
};

export default UstadPage;
