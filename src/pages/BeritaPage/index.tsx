import { useEffect, useState, type FC } from "react";
import HeaderDashboard from "../../components/HeaderDashboard";
import ComponentFilterAndButtonAdd from "../../components/ComponentFilterAndButtonAdd";
import { UseFilter } from "../../hooks/useFilter";
import useSearch from "../../hooks/useSearch";
import { getTodayLocal, isValidDate } from "../../utils/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Pagination from "../../components/Pagination";
import { handleActionDelete } from "../../utils/sweetalert/delete";
import NoData from "../../components/NoData";
import { NewsService } from "../../services/news.service";
import CardBeritaSmall from "../../components/CardBeritaSmall";
import useNotifSuccess from "../../hooks/useNotifSuccess";
import ModalContainer from "../../components/ModalContainer";
import type { ResponseNewsType } from "../../models/news-model";
import { X } from "lucide-react";

const BeritaPage: FC = () => {
  // nofication
  useNotifSuccess();

  // query client
  const queryClient = useQueryClient();

  // state modal
  const [isModal, setIsModal] = useState<{
    active: boolean;
    data: ResponseNewsType | undefined;
  }>({
    active: false,
    data: undefined,
  });

  // use filter
  const { handleFilter, page, from, to } = UseFilter();
  //  use search
  const { handleSearch, isSearch } = useSearch();
  const [debouncedSearch, setDebouncedSearch] = useState<string>(isSearch);

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(isSearch), 700);
    return () => clearTimeout(timer);
  }, [isSearch]);

  // query
  const queryFrom = isValidDate(from) ? from : getTodayLocal();
  const queryTo = isValidDate(to) ? to : getTodayLocal();

  // use query
  const { data: dataNews, isLoading } = useQuery({
    queryKey: ["newsForDashboard", page, queryFrom, queryTo, debouncedSearch],
    queryFn: () =>
      NewsService.read({
        from: queryFrom,
        to: queryTo,
        search: debouncedSearch,
        page: page.toString(),
      }),
    refetchOnWindowFocus: false,
  });

  // cek student
  if (!dataNews?.success) return null;

  // handle delete
  const handleDelete = async (id: number) => {
    // handle delete
    const result = await handleActionDelete(id, NewsService.delete);

    if (!result) return;

    // close modal
    setIsModal({ active: false, data: undefined });

    // refresh
    queryClient.invalidateQueries({
      queryKey: ["newsForDashboard"],
    });
  };

  return (
    <main className="w-full flex flex-col justify-start items-center relative overflow-hidden lg:pt-4 px-4 pb-12">
      {/* header */}
      <HeaderDashboard
        title="Data Berita dan Artikel"
        subTitle="Pusat pengelolaan data berita dan artikel."
        tanggal={true}
      />

      {/* content */}
      <div className="w-full mt-8 flex flex-col justify-start items-center lg:mt-12">
        {/* component filter and button add */}
        <ComponentFilterAndButtonAdd
          handleFilter={handleFilter}
          handleSearch={handleSearch}
          searchValue={isSearch}
          linkAdd="/dashboard/berita-artikel/tambah"
        />

        {/* card data */}
        <div className="w-full flex flex-row flex-wrap justify-start items-center gap-4 mt-12">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-80 h-80 bg-gray-300 rounded-lg animate-pulse"
              />
            ))
          ) : dataNews?.success && dataNews?.data?.data.length > 0 ? (
            dataNews?.data?.data.map((item) => (
              <CardBeritaSmall
                key={item.id}
                deskripsi={item.content}
                id={item.id}
                jenis={item.category}
                judul={item.title}
                img={item.thumbnail}
                admin={true}
                handleDelete={() => handleDelete(item.id)}
                linkUpdate={`/dashboard/berita-artikel/edit/${item.id}`}
                handleModal={() => setIsModal({ active: true, data: item })}
              />
            ))
          ) : (
            <NoData />
          )}
        </div>
      </div>

      {/* showing */}
      <Pagination
        totalData={dataNews?.data?.meta.totalData ?? 0}
        totalPage={dataNews?.data?.meta.totalPage ?? 0}
        handlePage={handleFilter}
        currentPage={dataNews?.data?.meta.currentPage ?? 0}
      />

      <ModalContainer fullWidth={true} active={isModal.active}>
        <div className="w-[95vw] flex flex-col justify-start items-start h-[80vh] py-2 px-4 overflow-y-scroll pt-12 lg:w-[50vw] lg:px-12 scrollbar-hidden lg:h-[90vh]">
          {/* button close */}
          <button
            type="button"
            onClick={() => setIsModal({ active: false, data: undefined })}
            className="fixed right-3 top-2 p-2 bg-secondary-blue rounded-full"
          >
            <X size={20} className="text-white" />
          </button>
          {/* header */}
          <h2 className="w-full text-center text-primary-black font-semibold text-base lg:text-xl">
            {isModal?.data?.title}
          </h2>
          {/* img*/}
          <div className="w-full flex flex-row justify-start items-center mt-6">
            <img
              src={`${import.meta.env.VITE_API_BASE_IMG_URL}/news/${isModal?.data?.thumbnail}`}
              alt="logo sipontren"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>

          {/* content */}
          <p className="mt-8">{isModal?.data?.content}</p>
        </div>
      </ModalContainer>
    </main>
  );
};

export default BeritaPage;
