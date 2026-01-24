import { useEffect, useState, type FC } from "react";
import HeaderDashboard from "../../components/HeaderDashboard";
import ComponentFilterAndButtonAdd from "../../components/ComponentFilterAndButtonAdd";
import useSearch from "../../hooks/useSearch";
import HeaderData from "../../components/HeaderData";
import { AlumniService } from "../../services/alumni.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useHandlePage } from "../../hooks/useHandlePage";
import CardData from "../../components/CardData";
import type { ResponseAlumniType } from "../../models/alumni-model";
import { handleActionDelete } from "../../utils/sweetalert/delete";
import Pagination from "../../components/Pagination";
import ModalContainer from "../../components/ModalContainer";
import ModalDetailData from "../../components/ModalDetailData";
import NoData from "../../components/NoData";
import useNotifSuccess from "../../hooks/useNotifSuccess";

const AlumniPage: FC = () => {
  // notif succes
  useNotifSuccess();

  // use query client
  const queryClient = useQueryClient();

  // state modal
  const [isModal, setIsModal] = useState<{
    active: boolean;
    data: ResponseAlumniType | undefined;
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
  const { data: alumni, isLoading } = useQuery({
    queryKey: ["alumniForDashboard", debouncedSearch, page],
    queryFn: () =>
      AlumniService.read({
        page: page.toString(),
        search: debouncedSearch,
      }),
    refetchOnWindowFocus: false,
  });

  // handle delete
  const handleDelete = async (id: number) => {
    // handle delete
    const result = await handleActionDelete(id, AlumniService.delete);

    if (!result) return;

    // close modal detail
    setIsModal({ active: false, data: undefined });

    // refresh
    queryClient.invalidateQueries({
      queryKey: ["alumniForDashboard"],
    });
  };

  return (
    <main className="w-full flex flex-col justify-start items-center relative overflow-hidden lg:pt-4 lg:h-full px-4">
      {/* header page */}
      <HeaderDashboard
        title="Data Alumni"
        subTitle="Pusat pengelolaan data alumni untuk kebutuhan review pondok pesantren"
        tanggal={true}
      />

      {/* content */}
      <div className="w-full mt-8 flex flex-col justify-start items-center lg:mt-12">
        {/* component filter and button add */}
        <ComponentFilterAndButtonAdd
          searchValue={isSearch}
          handleSearch={handleSearch}
          linkAdd="/dashboard/alumni/tambah"
        />

        {/* header data */}
        <HeaderData
          header={["Nama", "Angkatan", "Deskripsi"]}
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
          ) : alumni?.success && alumni?.data?.data.length > 0 ? (
            alumni?.data?.data.map((item, index) => (
              <CardData
                key={item.id}
                data={[item.name, item.angkatan.toString(), item.description]}
                dataSizeSmall={item.name}
                linkUpdate={`/dashboard/alumni/edit/${item.id}`}
                index={index + (alumni.data?.meta.pageSize ?? 0) * (page - 1)}
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
        totalData={alumni?.success ? alumni?.data?.meta.totalData : 0}
        totalPage={alumni?.success ? alumni?.data?.meta.totalPage : 0}
        currentPage={alumni?.success ? alumni?.data?.meta.currentPage : 1}
        handlePageSingle={handleChangePage}
        handlePage={() => {}}
      />

      {/* modal */}
      <ModalContainer fullWidth={true} active={isModal.active}>
        <ModalDetailData
          download={false}
          linkUpdate={`/dashboard/alumni/edit/${isModal.data?.id}`}
          size="sm"
          handleDelete={() => handleDelete(isModal.data?.id || 0)}
          data={[
            {
              label: "Nama",
              value: isModal.data?.name || "-",
            },
            {
              label: "Angkatan",
              value: `Tahun ${isModal.data?.angkatan}` || "-",
            },
            {
              label: "Deskripsi",
              value: isModal.data?.description || "-",
            },
          ]}
          handleClose={() => setIsModal({ active: false, data: undefined })}
        />
      </ModalContainer>
    </main>
  );
};

export default AlumniPage;
