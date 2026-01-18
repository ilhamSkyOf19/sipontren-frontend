import { useEffect, useState, type FC } from "react";
import HeaderDashboard from "../../components/HeaderDashboard";
import ComponentFilterAndButtonAdd from "../../components/ComponentFilterAndButtonAdd";
import useSearch from "../../hooks/useSearch";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useHandlePage } from "../../hooks/useHandlePage";
import { handleActionDelete } from "../../utils/sweetalert/delete";
import Pagination from "../../components/Pagination";
import NoData from "../../components/NoData";
import useNotifSuccess from "../../hooks/useNotifSuccess";
import { FasilitasService } from "../../services/fasilitas.service";
import CardFasilitas from "../../components/CardFasilitas";

const FasilitasPage: FC = () => {
  // notif succes
  useNotifSuccess();

  // use query client
  const queryClient = useQueryClient();

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
  const { data: fasilitas, isLoading } = useQuery({
    queryKey: ["fasilitasForDashboard", debouncedSearch, page],
    queryFn: () =>
      FasilitasService.read({
        page: page.toString(),
        search: debouncedSearch,
      }),
    refetchOnWindowFocus: false,
  });

  // handle delete
  const handleDelete = async (id: number) => {
    // handle delete
    const result = await handleActionDelete(id, FasilitasService.delete);

    if (!result) return;

    // refresh
    queryClient.invalidateQueries({
      queryKey: ["fasilitasForDashboard"],
    });
  };

  return (
    <main className="w-full flex flex-col justify-start items-center relative overflow-hidden lg:pt-4 lg:h-full px-4">
      {/* header page */}
      <HeaderDashboard
        title="Data Fasilitas"
        subTitle="Pusat pengelolaan data fasilitas"
        tanggal={true}
      />

      {/* content */}
      <div className="w-full mt-8 flex flex-col justify-start items-center lg:mt-12">
        {/* component filter and button add */}
        <ComponentFilterAndButtonAdd
          searchValue={isSearch}
          handleSearch={handleSearch}
          linkAdd="/dashboard/fasilitas/tambah"
        />

        {/* card data */}
        <div className="w-full flex flex-col justify-start items-center gap-4 mt-12">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-13 bg-gray-300 rounded-lg animate-pulse"
              />
            ))
          ) : fasilitas?.success && fasilitas?.data?.data.length > 0 ? (
            fasilitas?.data?.data.map((item) => (
              <CardFasilitas
                key={item.id}
                id={item.id}
                nama={item.fasilitas}
                img={item.images}
                deskripsi={item.keterangan}
                admin={true}
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
        totalData={fasilitas?.success ? fasilitas?.data?.meta.totalData : 0}
        totalPage={fasilitas?.success ? fasilitas?.data?.meta.totalPage : 0}
        currentPage={fasilitas?.success ? fasilitas?.data?.meta.currentPage : 1}
        handlePageSingle={handleChangePage}
        handlePage={() => {}}
      />
    </main>
  );
};

export default FasilitasPage;
