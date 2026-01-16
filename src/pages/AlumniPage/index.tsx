import { useEffect, useState, type FC } from "react";
import HeaderDashboard from "../../components/HeaderDashboard";
import ComponentFilterAndButtonAdd from "../../components/ComponentFilterAndButtonAdd";
import useSearch from "../../hooks/useSearch";
import HeaderData from "../../components/HeaderData";
import { AlumniService } from "../../services/alumni.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useHandlePage } from "../../hooks/useHandlePage";
import { useShowingRange } from "../../hooks/useShowingRange";
import CardData from "../../components/CardData";
import type { ResponseAlumniType } from "../../models/alumni-model";
import { handleActionDelete } from "../../utils/sweetalert/delete";
import Pagination from "../../components/Pagination";
import ModalContainer from "../../components/ModalContainer";
import ModalDetailData from "../../components/ModalDetailData";

const AlumniPage: FC = () => {
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

  // use showing range
  const { start, end } = useShowingRange(
    alumni?.success ? alumni?.data?.meta.currentPage : undefined,
    alumni?.success ? alumni?.data?.meta.pageSize : undefined,
    alumni?.success ? alumni?.data?.meta.totalData : undefined
  );

  // handle delete
  const handleDelete = async (id: number) => {
    // handle delete
    await handleActionDelete(id, AlumniService.delete);

    // refresh
    queryClient.invalidateQueries({
      queryKey: ["studentForDashboard"],
    });
  };

  return (
    <main className="w-full h-full flex flex-col justify-start items-center relative overflow-hidden lg:pt-4">
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
        />

        {/* header data */}
        <HeaderData
          header={["Nama", "Angkatan", "Deskripsi"]}
          headerSizeSmall="Nama"
        />

        {/* card data */}
        <div className="w-full flex flex-col justify-start items-start gap-4 mt-4">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full h-13 bg-gray-300 rounded-lg animate-pulse"
                />
              ))
            : alumni?.success &&
              alumni?.data?.data.map((item, index) => (
                <CardData
                  key={item.id}
                  data={[item.name, item.angkatan, item.description]}
                  dataSizeSmall={item.name}
                  id={item.id}
                  index={index}
                  handleOpenModal={() =>
                    setIsModal({ active: true, data: item })
                  }
                  handleDelete={() => handleDelete(item.id)}
                />
              ))}
        </div>
      </div>

      {/* showing */}
      <Pagination
        start={start}
        end={end}
        totalData={alumni?.success ? alumni?.data?.meta.totalData : 0}
        totalPage={alumni?.success ? alumni?.data?.meta.totalPage : 0}
        currentPage={alumni?.success ? alumni?.data?.meta.currentPage : 1}
        handlePageSingle={handleChangePage}
        handlePage={() => {}}
      />

      {/* modal */}
      <ModalContainer fullWidth={true} active={isModal.active}>
        <ModalDetailData
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
