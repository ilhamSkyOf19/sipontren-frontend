import { useEffect, useState, type FC } from "react";
import HeaderDashboard from "../../components/HeaderDashboard";
import ComponentFilterAndButtonAdd from "../../components/ComponentFilterAndButtonAdd";
import { UseFilter } from "../../hooks/useFilter";
import useSearch from "../../hooks/useSearch";
import HeaderData from "../../components/HeaderData";
import CardData from "../../components/CardData";
import { formatDateID, getTodayLocal, isValidDate } from "../../utils/utils";
import ModalContainer from "../../components/ModalContainer";
import ModalDetailData from "../../components/ModalDetailData";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StudentService } from "../../services/student.service";
import type { ResponseStudentType } from "../../models/student-model";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { useShowingRange } from "../../hooks/useShowingRange";
import { handleActionDelete } from "../../utils/sweetalert/delete";

const CalonSantriPage: FC = () => {
  // query client
  const queryClient = useQueryClient();

  // search
  const [searchParams, setSearchParams] = useSearchParams();

  // state jenis kelamin
  const [jenisKelamin, setJenisKelamin] = useState<
    "laki_laki" | "perempuan" | undefined
  >(undefined);
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

  // state modal
  const [isModal, setIsModal] = useState<{
    active: boolean;
    data: ResponseStudentType | undefined;
  }>({
    active: false,
    data: undefined,
  });

  // handle jenis kelamin
  const handleFilterJenisKelamin = (
    jenisKelamin: "laki_laki" | "perempuan" | undefined
  ) => {
    setJenisKelamin(jenisKelamin);
  };

  // jenis kelamin
  const jenisKelaminQuery = searchParams.get("jenisKelamin") ?? "";

  // set search params
  useEffect(() => {
    setSearchParams((prev) => {
      // page
      if (jenisKelamin === undefined) {
        prev.delete("jenisKelamin");
      } else {
        prev.set("jenisKelamin", jenisKelamin);
      }

      return prev;
    });
  }, [jenisKelamin]);

  // query
  const queryFrom = isValidDate(from) ? from : getTodayLocal();
  const queryTo = isValidDate(to) ? to : getTodayLocal();

  // use query
  const { data: student, isLoading } = useQuery({
    queryKey: [
      "studentForDashboard",
      page,
      jenisKelaminQuery,
      queryFrom,
      queryTo,
      debouncedSearch,
    ],
    queryFn: () =>
      StudentService.read({
        from: queryFrom,
        to: queryTo,
        search: debouncedSearch,
        page: page.toString(),
        jenis_kelamin: jenisKelaminQuery as "laki_laki" | "perempuan",
      }),
    refetchOnWindowFocus: false,
  });

  // use showing range
  const { start, end } = useShowingRange(
    student?.success ? student?.data?.meta.currentPage : undefined,
    student?.success ? student?.data?.meta.pageSize : undefined,
    student?.success ? student?.data?.meta.totalData : undefined
  );

  // cek student
  if (!student?.success) return null;

  // handle delete
  const handleDelete = async (id: number) => {
    // handle delete
    await handleActionDelete(id, StudentService.delete);

    // refresh
    queryClient.invalidateQueries({
      queryKey: ["studentForDashboard"],
    });
  };

  return (
    <main className="w-full h-full flex flex-col justify-start items-center relative overflow-hidden lg:pt-4">
      {/* header */}
      <HeaderDashboard
        title="Data Calon Santri"
        subTitle="Pusat pengelolaan data calon santri untuk kebutuhan administrasi dan pelaporan."
        tanggal={true}
      />

      {/* content */}
      <div className="w-full mt-8 flex flex-col justify-start items-center lg:mt-12">
        {/* component filter and button add */}
        <ComponentFilterAndButtonAdd
          handleFilter={handleFilter}
          handleSearch={handleSearch}
          searchValue={isSearch}
          handleFilterJenisKelamin={handleFilterJenisKelamin}
        />

        {/* content */}
        {/* header data */}
        <HeaderData
          header={[
            "Nama",
            "Tanggal Daftar",
            "Jenis Sekolah",
            "Jenis Kelamin",
            "Nomor Telepon",
          ]}
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
            : student?.data?.data.map((item, index) => (
                <CardData
                  key={item.id}
                  data={[
                    item.nama_lengkap,
                    formatDateID(new Date(item.createdAt)),
                    item.jenis_sekolah,
                    item.jenis_kelamin === "laki_laki"
                      ? "Laki-laki"
                      : "Perempuan",
                    item.no_telepon,
                  ]}
                  dataSizeSmall={item.nama_lengkap}
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
        totalData={student?.data?.meta.totalData ?? 0}
        totalPage={student?.data?.meta.totalPage ?? 0}
        handlePage={handleFilter}
        currentPage={student?.data?.meta.currentPage ?? 0}
      />

      {/* modal */}
      <ModalContainer fullWidth={true} active={isModal.active}>
        <ModalDetailData
          handleDelete={() => handleDelete(isModal.data?.id || 0)}
          data={[
            {
              label: "Nama",
              value: isModal.data?.nama_lengkap || "-",
            },
            {
              label: "Tanggal Daftar",
              value: isModal.data?.createdAt ? formatDateID(new Date()) : "-",
            },
            {
              label: "Jenis Sekolah",
              value: isModal.data?.jenis_sekolah || "-",
            },
            {
              label: "Jenis Kelamin",
              value: isModal.data?.jenis_kelamin
                ? isModal.data.jenis_kelamin === "laki_laki"
                  ? "Laki-laki"
                  : "Perempuan"
                : "-",
            },
            {
              label: "Nomor Telepon",
              value: isModal.data?.no_telepon || "-",
            },
            {
              label: "Alamat",
              value: isModal.data?.alamat || "-",
            },
            {
              label: "Alamat Sekolah Asal",
              value: isModal.data?.alamat_sekolah_asal || "-",
            },
            {
              label: "Tanggal Lahir",
              value: isModal.data?.tanggal_lahir
                ? formatDateID(new Date())
                : "-",
            },
            {
              label: "Asal Sekolah",
              value: isModal.data?.asal_sekolah || "-",
            },
            {
              label: "jumlah saudara",
              value: isModal.data?.jumlah_saudara.toString() || "-",
            },
            {
              label: "anak ke",
              value: isModal.data?.anak_ke.toString() || "-",
            },
            {
              label: "nama ayah",
              value: isModal.data?.nama_lengkap_ayah || "-",
            },
            {
              label: "nama ibu",
              value: isModal.data?.nama_lengkap_ibu || "-",
            },
            {
              label: "nama wali",
              value: isModal.data?.nama_lengkap_wali || "-",
            },
            {
              label: "Dokumen KK",
              value: isModal.data?.foto_kk ? "ada" : "tidak ada",
            },
            {
              label: "Dokumen Akta Kelahiran",
              value: isModal.data?.fc_akta_kelahiran ? "ada" : "tidak ada",
            },
            {
              label: "Dokumen KTP",
              value: isModal.data?.fc_ktp ? "ada" : "tidak ada",
            },
            {
              label: "Dokumen Foto Formal",
              value: isModal.data?.foto_formal ? "ada" : "tidak ada",
            },
            {
              label: "Dokumen KIS/KIP",
              value: isModal.data?.fc_kis_kip ? "ada" : "tidak ada",
            },
          ]}
          handleClose={() => setIsModal({ active: false, data: undefined })}
        />
      </ModalContainer>
    </main>
  );
};

export default CalonSantriPage;
