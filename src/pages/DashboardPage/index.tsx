import { useRef, useState, type FC, type ReactNode } from "react";
import useNotifSuccess from "../../hooks/useNotifSuccess";
import HeaderDashboard from "../../components/HeaderDashboard";
import {
  Building2,
  Calendar,
  ChevronDown,
  Mars,
  Newspaper,
  Pencil,
  Trash,
  UsersRound,
  Venus,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import BoxInputDateFilter from "../../components/BoxInputDateFilter";
import {
  downloadExcel,
  formatDateID,
  formatNumberID,
  isValidDate,
} from "../../utils/utils";
import useClickOutside from "../../hooks/useClickOutSide";
import clsx from "clsx";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { DashboardService } from "../../services/dashboard.service";
import { StudentService } from "../../services/student.service";
import ModalContainer from "../../components/ModalContainer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UpdateJumlahAlumniType } from "../../models/jumlahAlumni";
import { JumlahAlumniValidation } from "../../validations/jumlahAlumni-validation";
import BoxInputNumber from "../../components/BoxInputNumber";
import ButtonSubmit from "../../components/ButtonSubmit";
import { PendaftaranService } from "../../services/pendaftaran.service";
import type { CreatePendaftaranType } from "../../models/pendaftaran-model";
import loadingWhite from "../../assets/animation/loading-white.svg";
import { UseFilter } from "../../hooks/useFilter";
import NoData from "../../components/NoData";
import { handleActionDelete } from "../../utils/sweetalert/delete";
import Swal from "sweetalert2";

const DashboardPage: FC = () => {
  // notification
  useNotifSuccess();

  return (
    <main className="w-full flex flex-col justify-start items-center relative overflow-hidden pb-48 lg:pt-4 px-4 lg:pb-32">
      {/* header */}
      <HeaderDashboard
        title="Dashboard"
        subTitle="Pusat pengelolaan data santri, alumni, dan informasi Pondok Pesantren."
        tanggal={true}
      />

      {/* content grid bento */}
      <div className="w-full min-h-screen grid grid-cols-1 lg:h-[110vh] lg:grid-cols-4 mt-8 gap-6">
        {/* card 1 */}
        <CardStudent />

        {/* card ustad , alumni, berita */}
        <CardUstadAlumniBerita />

        {/* activate psb */}
        <ActivePsb />
      </div>
    </main>
  );
};

// card student
const CardStudent: FC = () => {
  // state modal perode date
  const [isModalPeriode, setIsModalPeriode] = useState<boolean>(false);

  // state periode
  const [periodeId, setPeriodeId] = useState<number>(0);

  // // ref date
  const refPeriode = useRef<HTMLInputElement>(null);
  const refButtonPeriode = useRef<HTMLButtonElement>(null);

  // state from & to
  const { from, to, handleFilter } = UseFilter();

  // click out side
  useClickOutside({
    refs: [refPeriode, refButtonPeriode],
    onOutsideClick: () => {
      setIsModalPeriode(false);
    },
  });

  // get query
  const data = useQueries({
    queries: [
      {
        queryKey: ["studentCount", from, to],
        queryFn: () => StudentService.getCount(from, to),
        enabled:
          from !== "" && to !== "" && isValidDate(from) && isValidDate(to),
      },
      {
        queryKey: ["pendaftaran"],
        queryFn: () => PendaftaranService.read(),
        refetchOnWindowFocus: false,
      },
    ],
  });

  // destruct
  const [dataStudent, dataPeriode] = data;

  const handleExport = async () => {
    if (!from || !to) return;
    const res = await StudentService.downloadExcel(from, to);
    downloadExcel(res.data, "data-siswa");
  };

  return (
    <div className="col-span-1 row-span-1 lg:col-span-2 lg:row-span-2 bg-primary-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-2xl py-3 px-5">
      {/* header */}
      <HeaderTitle
        icon={<UsersRound size={28} className="text-secondary-blue" />}
        title="Data Calon Santri"
      />

      {/* action  */}
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <div className="w-full flex flex-row justify-col lg:justify-between items-center gap-2 h-9 lg:h-11 mt-4 flex-wrap">
          <div className="w-full h-full flex flex-row justify-start items-start gap-2">
            {/* button download */}
            <button
              type="button"
              className="text-sm bg-[#12501A] text-white h-full px-4 rounded-md font-medium hover:-translate-y-1 transition-all ease-in-out duration-300 z-10"
              onClick={() => handleExport()}
            >
              Excel
            </button>
            {/* button pdf */}
            <button
              type="button"
              className="text-sm bg-[#d22e2e] text-white h-full px-4 rounded-md font-medium hover:-translate-y-1 transition-all ease-in-out duration-300 z-10"
            >
              PDF
            </button>

            <Link
              to={"/dashboard/ustad"}
              className="h-full px-4 bg-secondary-blue rounded-sm text-xs lg:text-sm text-primary-white flex flex-col justify-center items-center hover:-translate-y-1 transition-all ease-in-out duration-300 z-10"
            >
              selengkapnya
            </Link>

            {/* filer periode */}
          </div>
        </div>

        <div className="relative w-full flex flex-row justify-start items-center gap-4">
          <button
            ref={refButtonPeriode}
            onClick={() => setIsModalPeriode((prev) => !prev)}
            type="button"
            className={clsx(
              "py-2 rounded-md px-2 lg:px-4 flex flex-row justify-start items-center bg-primary-white shadow-[0_4px_10px_2px_rgba(0,0,0,0.07)] gap-2 mt-2  transition-transform ease-in-out duration-300 shrink-0",
              isModalPeriode ? "-translate-y-0.5" : "hover:-translate-y-0.5",
            )}
          >
            {/* icon */}
            <Calendar size={18} className="text-secondary-blue" />

            {/* label */}
            {from && to ? (
              <>
                <span className="text-xs font-medium">
                  {isValidDate(from) ? formatDateID(new Date(from)) : "-"}
                </span>
                <span className="text-xs font-medium">-</span>
                <span className="text-xs font-medium">
                  {isValidDate(to) ? formatDateID(new Date(to)) : "-"}
                </span>
              </>
            ) : (
              <span className="text-xs font-medium">Pilih Periode</span>
            )}

            {/* icon arrow down */}
            <ChevronDown
              size={20}
              className={clsx(
                "text-secondary-blue",
                isModalPeriode ? "rotate-180" : "rotate-0",
              )}
            />
          </button>

          {/* modal periode */}
          <div
            ref={refPeriode}
            className={clsx(
              "w-62 h-36 rounded-md bg-primary-white shadow-[0_0_10px_1px_rgba(0,0,0,0.07)] absolute left-0 top-[105%] overflow-hidden transition-all ease-in-out duration-300 z-10 overflow-y-scroll scrollbar-hidden",
              isModalPeriode ? "max-h-36 " : "max-h-0 ",
            )}
          >
            {/* button */}
            {dataPeriode.isLoading ? (
              <div className="w-full h-full flex flex-col justify-start items-start gap-1">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full h-12 bg-gray-300 animate-pulse"
                  />
                ))}
              </div>
            ) : dataPeriode?.data?.success &&
              dataPeriode.data.data.length > 0 ? (
              dataPeriode.data.data.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    handleFilter({
                      from: item.dari.toString(),
                      to: item.sampai.toString(),
                    });

                    // set periode id
                    setPeriodeId(item.id);

                    // close modal
                    setIsModalPeriode(false);
                  }}
                  className={clsx(
                    "py-4 px-3 w-full flex flex-row justify-between items-center hover:bg-gray-200 transition-all ease-in-out duration-300",
                    periodeId === item.id && "bg-gray-200",
                  )}
                >
                  {/* label 1 */}
                  <span className="text-xs font-medium">
                    {formatDateID(new Date(item.dari))}
                  </span>
                  <span className="text-xs font-medium">-</span>
                  <span className="text-xs font-medium">
                    {formatDateID(new Date(item.sampai))}
                  </span>
                </button>
              ))
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <p className="text-xs text-center">Tidak ada periode</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* total data */}
      <TotalData
        lakiLaki={
          (dataStudent.isLoading
            ? "0"
            : dataStudent.data?.success &&
              formatNumberID(dataStudent.data?.data?.laki_laki)) || "-"
        }
        perempuan={
          (dataStudent.isLoading
            ? "0"
            : dataStudent.data?.success &&
              formatNumberID(dataStudent.data?.data?.perempuan)) || "-"
        }
      />
    </div>
  );
};

// card ustad , alumni berita
const CardUstadAlumniBerita: FC = () => {
  // query client
  const queryClient = useQueryClient();
  // state modal update
  const [isModalOpen, setIsModalOpen] = useState(false);

  // query
  const { data: dataDashboard, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => DashboardService.read(),
    refetchOnWindowFocus: false,
  });

  // use form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<UpdateJumlahAlumniType, "id">>({
    resolver: zodResolver(JumlahAlumniValidation.UPDATE),
  });

  // use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: Omit<UpdateJumlahAlumniType, "id">) => {
      return DashboardService.jumlahAlumniUpdate(data);
    },
    onSuccess: () => {
      setIsModalOpen(false);

      // refetch
      queryClient.refetchQueries({
        queryKey: ["dashboard"],
      });

      reset();
    },
    onError: () => {
      setIsModalOpen(false);
    },
  });

  // handle on submit
  const onSubmit = async (data: Omit<UpdateJumlahAlumniType, "id">) => {
    try {
      // update
      await mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  // cek
  if (!dataDashboard?.success) return;

  return (
    <>
      {/* ustad */}
      <div className="col-span-1 row-span-1 lg:col-span-2 lg:row-span-2 bg-primary-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-2xl py-3 px-5 flex flex-col justify-between items-start pb-4">
        <HeaderTitle
          icon={<UsersRound size={28} className="text-secondary-blue" />}
          title="Data Ustad"
        />
        <div className="w-full h-full flex flex-col justify-between items-start">
          {/* total data */}
          <TotalData
            lakiLaki={
              isLoading
                ? "0"
                : formatNumberID(dataDashboard?.data?.ustad.laki_laki) || "0"
            }
            perempuan={
              isLoading
                ? "0"
                : formatNumberID(dataDashboard?.data?.ustad.perempuan) || "0"
            }
          />

          {/* action */}
          <div className="w-full flex flex-row justify-start items-start gap-3">
            <Link
              to={"/dashboard/ustad"}
              className="py-1.5 px-4 bg-secondary-blue rounded-sm mt-4 text-xs lg:text-sm text-primary-white hover:bg-primary-blue transition-all ease-in-out duration-300"
            >
              selengkapnya
            </Link>
          </div>
        </div>
      </div>

      {/* data alumni */}
      <div className="col-span-1 row-span-1 lg:col-span-2 lg:row-span-2 bg-primary-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-2xl py-3 px-5 flex flex-col justify-between items-start pb-4">
        <HeaderTitle
          icon={<UsersRound size={28} className="text-secondary-blue" />}
          title="Data Alumni"
        />
        <div className="w-full h-full flex flex-col justify-between items-start">
          {/* total data */}
          <TotalData
            lakiLaki={
              formatNumberID(dataDashboard.data?.jumlahAlumni.laki_laki) || "0"
            }
            perempuan={
              formatNumberID(dataDashboard.data?.jumlahAlumni.perempuan) || "0"
            }
          />

          {/* action */}
          <div className="w-full flex flex-row justify-start items-start gap-3">
            <Link
              to={"/dashboard/alumni"}
              className="py-1.5 px-4 bg-secondary-blue rounded-sm mt-4 text-xs lg:text-sm text-primary-white hover:bg-primary-blue transition-all ease-in-out duration-300"
            >
              selengkapnya
            </Link>

            {/* button modal for set data alumni */}
            <button
              type="button"
              className="py-1.5 px-4 bg-primary-green rounded-sm mt-4 text-xs lg:text-sm text-primary-white relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-primary-black/20 before:opacity-0 hover:before:opacity-100  before:transition-all before:ease-in-out before:duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              update data
            </button>
          </div>
        </div>

        {/* modal update data  */}
        <ModalContainer active={isModalOpen} fullWidth={true}>
          <div className="w-[90vw] lg:w-[30vw] lg:h-[50vh] h-auto flex flex-col justify-start items-start py-7 lg:pt-6 px-8 relative">
            {/* button close  */}
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={() => isPending === false && setIsModalOpen(false)}
            >
              <X size={24} className="text-primary-black" />
            </button>
            {/* header */}
            <div className="w-full flex flex-col justify-start items-center pb-2 border-b-2 border-primary-black">
              <h4 className="text-primary-black text-base lg:text-lg font-semibold">
                Update Jumlah Alumni
              </h4>
            </div>

            {/* form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col justify-start items-start mt-4"
            >
              {/* input laki laki */}
              <BoxInputNumber
                register={register("laki_laki")}
                label="Jumlah Laki-laki"
                placeholder="Masukan jumlah laki-laki ..."
                name="laki_laki"
                max={999999}
                errorMessage={errors.laki_laki?.message}
              />
              {/* input perempuan */}
              <BoxInputNumber
                register={register("perempuan")}
                label="Jumlah Perempuan"
                placeholder="Masukan jumlah perempuan ..."
                name="perempuan"
                max={999999}
                errorMessage={errors.perempuan?.message}
              />

              {/* button submit */}
              <ButtonSubmit label="SUBMIT" loading={isPending} />
            </form>
          </div>
        </ModalContainer>
      </div>

      {/* data berita */}
      <div className="col-span-1 row-span-1 lg:col-span-2 lg:row-span-2 bg-primary-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-2xl py-3 px-5 flex flex-col justify-between items-start pb-4">
        <HeaderTitle
          icon={<UsersRound size={28} className="text-secondary-blue" />}
          title="Data Berita & Artikel"
        />
        <div className="w-full h-full flex flex-col justify-between items-start">
          {/* total data */}
          <div className="w-full flex flex-col justify-start items-start mt-4">
            {/* total */}
            <h4 className="font-medium text-primary-black text-base">
              Total Data :
            </h4>

            <div className="w-full h-20 lg:h-28 mt-3 flex flex-row justify-start items-center gap-3">
              {/* berita */}
              <div className="w-full h-full bg-primary-white shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] rounded-md hover:-translate-y-1 transition-all ease-in-out duration-300 flex flex-col justify-start items-start p-3">
                {/* title */}
                <div className="w-full flex flex-row justify-between items-center">
                  <p className="text-xs lg:text-sm text-primary-black font-medium">
                    Berita
                  </p>

                  {/* icon */}
                  <Newspaper
                    size={24}
                    className="text-gray-400 hidden lg:block"
                  />
                </div>

                {/* total data */}
                <span className="text-2xl lg:text-3xl font-semibold text-secondary-blue lg:mt-3">
                  {formatNumberID(dataDashboard?.data?.berita.berita) || 0}
                </span>
              </div>

              {/* artikel */}
              <div className="w-full h-full bg-primary-white shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] rounded-md hover:-translate-y-1 transition-all ease-in-out duration-300 flex flex-col justify-start items-start p-3">
                {/* title */}
                <div className="w-full flex flex-row justify-between items-center">
                  <p className="text-xs lg:text-sm text-primary-black font-medium">
                    Artikel
                  </p>

                  {/* icon */}
                  <Newspaper
                    size={24}
                    className="text-secondary-blue hidden lg:block"
                  />
                </div>

                {/* total data */}
                <span className="text-2xl lg:text-3xl font-semibold text-secondary-blue lg:mt-3">
                  {formatNumberID(dataDashboard?.data?.berita.artikel) || 0}
                </span>
              </div>
            </div>
          </div>

          {/* action */}
          <div className="w-full flex flex-row justify-start items-start gap-3">
            <Link
              to={"/dashboard/berita-artikel"}
              className="py-1.5 px-4 bg-secondary-blue rounded-sm mt-4 text-xs lg:text-sm text-primary-white hover:bg-primary-blue transition-all ease-in-out duration-300"
            >
              selengkapnya
            </Link>
          </div>
        </div>
      </div>

      {/* fasilitas */}
      <div className="lg:col-span-1 lg:row-span-1 bg-primary-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-2xl py-3 px-5 flex flex-col justify-between items-start pb-4">
        <HeaderTitle
          icon={<Building2 size={28} className="text-secondary-blue" />}
          title="Fasilitas"
        />
        <div className="w-full h-full flex flex-col justify-between items-start">
          <div className="w-full flex flex-row justify-start items-start gap-3">
            <h4 className="font-medium text-primary-black text-base mt-2">
              Total Fasilitas :
            </h4>

            <div className="flex flex-row justify-start items-end ">
              <h4 className="font-bold text-3xl mt-2 mb-6 text-secondary-blue">
                {formatNumberID(dataDashboard?.data?.fasilitas) || 0}
              </h4>

              <span className="mb-6 text-sm text-primary-black lg:hidden">
                / fasilitas
              </span>
            </div>
          </div>

          <Link
            to={"/dashboard/fasilitas"}
            className="py-1.5 px-4 bg-secondary-blue rounded-sm text-xs lg:text-sm text-primary-white hover:bg-primary-blue transition-all ease-in-out duration-300"
          >
            selengkapnya
          </Link>
        </div>
      </div>
    </>
  );
};

// card active psb
const ActivePsb: FC = () => {
  // query client
  const queryClient = useQueryClient();

  // state modal periode
  const [isModalPreviewDataPeriode, setIsModalPreviewDataPeriode] =
    useState<boolean>(false);

  // state error message
  const [isErrorAktif, setIsErrorAktif] = useState<boolean>(false);

  // state modal perode date
  const [isModalPeriode, setIsModalPeriode] = useState<boolean>(false);

  // state periode
  const [periode, setPeriode] = useState<{
    id: number;
    periode: string;
    aktif: boolean;
  }>({
    id: 0,
    periode: "",
    aktif: false,
  });

  // // ref input
  const refInputDateFrom = useRef<HTMLInputElement>(null);
  const refInputDateTo = useRef<HTMLInputElement>(null);

  // // ref date
  const refPeriode = useRef<HTMLInputElement>(null);
  const refButtonPeriode = useRef<HTMLButtonElement>(null);

  // state filter
  const [isDate, setIsDate] = useState<{ from: string; to: string }>({
    from: "",
    to: "",
  });

  // use query
  const { data: dataPeriode, isLoading } = useQuery({
    queryKey: ["pendaftaran"],
    queryFn: () => PendaftaranService.read(),
    refetchOnWindowFocus: false,
  });

  // handle set date from
  const handleSetDate = (type: "from" | "to", value: string) => {
    if (type === "from") {
      setIsDate({ ...isDate, from: new Date(value).toISOString() });
    } else {
      setIsDate({ ...isDate, to: new Date(value).toISOString() });
    }
  };

  // click out side
  useClickOutside({
    refs: [refPeriode, refButtonPeriode],
    onOutsideClick: () => {
      setIsModalPeriode(false);
    },
  });

  // use mutation create
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreatePendaftaranType) => {
      return PendaftaranService.create(data);
    },
    onSuccess: () => {
      // notifikasi
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Periode berhasil dibuat",
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
        customClass: {
          container: "swal-z",
        },
        padding: "7px 12px",
      });

      // refetch
      queryClient.invalidateQueries({
        queryKey: ["pendaftaran"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // handle mutate
  const handleMutate = async () => {
    try {
      // cek
      if (isDate.from && isDate.to) {
        await mutateAsync({
          dari: isDate.from,
          sampai: isDate.to,
        });
      } else return;
    } catch (error) {
      console.log(error);
    }
  };

  // use mutation update
  const { mutateAsync: mutateUpdate, isPending: isPendingUpdate } = useMutation(
    {
      mutationFn: (data: { aktif: boolean }) => {
        return PendaftaranService.updateAktif(periode.id, data.aktif);
      },
      onSuccess: (data) => {
        if (!data.success) return;
        // refetch
        queryClient.invalidateQueries({
          queryKey: ["pendaftaran"],
        });

        // reset periode
        setPeriode((prev) => ({
          ...prev,
          aktif: data.data.aktif,
          id: data.data.id,
        }));

        // notifikasi
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `Berhasil ${data.data.aktif === true ? "aktif" : "non aktif"}`,
          showConfirmButton: false,
          timer: 1800,
          timerProgressBar: true,
          customClass: {
            container: "swal-z",
          },
          padding: "7px 12px",
        });

        // set error aktif
        setIsErrorAktif(false);
      },
      onError: (error) => {
        console.log(error);

        // set error aktif
        setIsErrorAktif(true);
      },
    },
  );

  // handle mutate
  const handleMutateUpdateAktif = async () => {
    try {
      // cek
      if (periode.id === 0) return;

      // update
      await mutateUpdate({ aktif: !periode.aktif });
    } catch (error) {
      console.log(error);
    }
  };

  // periode aktif
  const periodeAktif =
    dataPeriode?.success &&
    dataPeriode?.data.find((item) => item.aktif === true);

  // mutate delete
  const { mutateAsync: mutateDelete, isPending: isPendingDelete } = useMutation(
    {
      mutationFn: (id: number) => PendaftaranService.delete(id),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["pendaftaran"],
        });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  // use delete
  const handleDeleteData = async (id: number) => {
    try {
      // delete
      await handleActionDelete(id, mutateDelete);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-span-1 row-span-2 lg:col-span-3 lg:row-span-4 bg-primary-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-2xl py-3 px-5 flex flex-col justify-between lg:justify-start items-start pb-4">
      {/* header title */}
      <HeaderTitle
        title="Pendaftaran Santri Baru"
        icon={<UsersRound size={28} className="text-secondary-blue" />}
      />

      <div className="w-full h-full flex flex-col  lg:flex-row justify-end items-start lg:items-center mt-4 lg:gap-12 gap-4">
        <div className="w-full h-full lg:flex-1 flex flex-col justify-start items-start gap-3">
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <BoxInputDateFilter
              type="from"
              refInput={refInputDateFrom}
              handleDate={handleSetDate}
              label={isDate.from ?? ""}
              to={isDate.to ?? ""}
              noMax={true}
            />

            <BoxInputDateFilter
              type="to"
              refInput={refInputDateTo}
              handleDate={handleSetDate}
              label={isDate.to ?? ""}
              from={isDate.from ?? ""}
              noMax={true}
            />
          </div>

          {/* button submut */}
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <button
              disabled={isPending}
              type="button"
              className="text-white h-8 w-32 bg-secondary-blue text-sm rounded-sm capitalize hover:bg-primary-blue transition-all ease-in-out duration-300 flex flex-row justify-center items-center"
              onClick={() => handleMutate()}
            >
              {isPending ? (
                <img src={loadingWhite} alt="loading" className="w-6" />
              ) : (
                <span>buat periode</span>
              )}
            </button>

            {/* button preview */}
            <button
              type="button"
              className="text-primary-black h-8 w-32 bg-gray-300 text-sm rounded-sm capitalize hover:bg-gray-400 transition-all ease-in-out duration-300 flex flex-row justify-center items-center"
              onClick={() => setIsModalPreviewDataPeriode(true)}
            >
              <span>Lihat Periode</span>
            </button>
          </div>
        </div>

        {/* action */}
        <div className="lg:flex-2 w-full h-full flex flex-col lg:flex-row justify-start items-start">
          <div className="flex-1 flex flex-col justify-start items-start">
            {/* title */}
            <h3 className="text-base font-medium text-primary-black">
              Aktifkan Pendaftaran
            </h3>

            {/* button pilih periode */}
            <div className="relative">
              <button
                ref={refButtonPeriode}
                onClick={() => setIsModalPeriode((prev) => !prev)}
                type="button"
                className={clsx(
                  "py-2 rounded-md px-2 lg:px-4 flex flex-row justify-start items-center bg-primary-white shadow-[0_4px_10px_2px_rgba(0,0,0,0.07)] gap-2 mt-2  transition-transform ease-in-out duration-300",
                  isModalPeriode
                    ? "-translate-y-0.5"
                    : "hover:-translate-y-0.5",
                )}
              >
                {/* icon */}
                <Calendar size={18} className="text-secondary-blue" />

                {/* label */}
                <div className="w-full flex flex-row justify-start items-center">
                  {periode.periode ? (
                    <span className="text-xs font-medium">
                      {periode.periode}
                    </span>
                  ) : (
                    <span className="text-xs font-medium">Pilih Periode</span>
                  )}

                  {/* icon */}
                  <ChevronDown
                    size={20}
                    className={clsx(
                      "text-secondary-blue",
                      isModalPeriode ? "rotate-180" : "rotate-0",
                    )}
                  />
                </div>
              </button>

              {/* modal periode */}
              <div
                ref={refPeriode}
                className={clsx(
                  "w-62 h-36 rounded-md bg-primary-white shadow-[0_0_10px_1px_rgba(0,0,0,0.07)] absolute left-0 top-[105%] overflow-hidden transition-all ease-in-out duration-300 z-10 overflow-y-scroll scrollbar-hidden",
                  isModalPeriode ? "max-h-36 " : "max-h-0 ",
                )}
              >
                {/* button */}
                {isLoading ? (
                  <div className="w-full h-full flex flex-col justify-start items-start gap-1">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="w-full h-12 bg-gray-300 animate-pulse"
                      />
                    ))}
                  </div>
                ) : dataPeriode?.success && dataPeriode.data.length > 0 ? (
                  dataPeriode.data.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setPeriode({
                          id: item.id,
                          periode: `${formatDateID(new Date(item.dari))} - ${formatDateID(new Date(item.sampai))}`,
                          aktif: item.aktif,
                        });
                        setIsModalPeriode(false);
                      }}
                      className={clsx(
                        "py-4 px-3 w-full flex flex-row justify-between items-center hover:bg-gray-200 transition-all ease-in-out duration-300",
                        periode.id === item.id && "bg-gray-200",
                      )}
                    >
                      {/* label 1 */}
                      <span className="text-xs font-medium">
                        {formatDateID(new Date(item.dari))}
                      </span>
                      <span className="text-xs font-medium">-</span>
                      <span className="text-xs font-medium">
                        {formatDateID(new Date(item.sampai))}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="w-full h-full flex flex-col justify-center items-center">
                    <p className="text-xs text-center">Tidak ada periode</p>
                  </div>
                )}
              </div>
            </div>

            {/* button active */}
            <button
              disabled={isPendingUpdate}
              type="button"
              className={clsx(
                "text-white h-8 w-32 bg-secondary-blue text-sm rounded-sm capitalize hover:bg-primary-blue transition-all ease-in-out duration-300 flex flex-row justify-center items-center mt-4",
                periode.id === 0 ? "hidden" : "flex",
              )}
              onClick={() => handleMutateUpdateAktif()}
            >
              {isPendingUpdate ? (
                <img src={loadingWhite} alt="loading" className="w-6" />
              ) : dataPeriode?.success &&
                dataPeriode.data.find((item) => item.id === periode.id)
                  ?.aktif ? (
                <span>Non Aktifkan</span>
              ) : (
                <span>Aktifkan</span>
              )}
            </button>
          </div>

          {/* label */}
          <div className="lg:flex-1 w-full mt-12 lg:mt-0 h-full flex flex-col justify-center items-center my-4 lg:my-0">
            {dataPeriode?.success && periodeAktif ? (
              <>
                {/* error message */}
                {isErrorAktif && (
                  <span className="text-xs mb-2 text-red-500">
                    Periode sedang aktif
                  </span>
                )}

                {/* date */}
                <span className="text-sm lg:text-sm font-medium text-primary-black">
                  {`${formatDateID(new Date(periodeAktif.dari))} - ${formatDateID(
                    new Date(periodeAktif.sampai),
                  )}`}
                </span>

                <h3 className="text-lg font-medium text-secondary-blue">
                  Pendaftaran Dibuka
                </h3>

                <span className="text-xs text-primary-black text-center">
                  Pendaftaran santri untuk periode ini sedang dibuka
                </span>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium text-secondary-blue">
                  Pendaftaran Ditutup
                </h3>

                <span className="text-xs text-primary-black text-center">
                  Silahkan aktifkan pendaftaran untuk memulai pendaftaran santri
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* modal periode */}
      <ModalContainer active={isModalPreviewDataPeriode} fullWidth={true}>
        <div className="w-[90vw] lg:w-[50vw] lg:h-[80vh] py-4 px-6 flex flex-col justify-start items-start relative bg-primary-white rounded-3xl overflow-y-scroll scrollbar-hidden">
          {/* button close  */}
          <button
            type="button"
            className="absolute right-3 top-2"
            onClick={() => setIsModalPreviewDataPeriode(false)}
          >
            <X size={28} className="text-primary-black" />
          </button>
          {/* header */}
          <div className="w-full flex flex-col justify-start items-center pb-3 border-b-2 border-primary-black">
            <h1 className="text-2xl font-medium text-primary-black">
              Data Periode
            </h1>
          </div>

          {/* content */}
          <div className="w-full flex flex-col justify-start items-start mt-4">
            {/* header */}
            <div className="px-4 w-full h-12 bg-gray-300 shadow-[0_0_10px_1px_rgba(0,0,0,0.1)] rounded-md flex flex-row justify-start items-center mb-4">
              {/* number */}
              <span className="flex-1 text-base font-semibold">No</span>
              <span className="flex-2 text-base font-semibold">Dari</span>
              <span className="flex-2 text-base font-semibold">Sampai</span>
              <span className="flex-2 text-base font-semibold">Status</span>
              <span className="flex-1 text-base font-semibold ">Action</span>
            </div>

            {/* card data  */}
            <div className="w-full flex flex-col justify-start items-start gap-3">
              {dataPeriode?.success && dataPeriode.data.length > 0 ? (
                dataPeriode.data.map((item, index) => (
                  <div
                    key={item.id}
                    className="px-4 w-full h-12 bg-primary-white shadow-[0_0_10px_1px_rgba(0,0,0,0.1)] rounded-md flex flex-row justify-start items-center"
                  >
                    {/* number */}
                    <span className="flex-1 text-sm">{index + 1}</span>
                    <span className="flex-2 text-sm">
                      {formatDateID(new Date(item.dari))}
                    </span>
                    <span className="flex-2 text-sm">
                      {formatDateID(new Date(item.sampai))}
                    </span>
                    <span className="flex-2 text-sm">
                      {item.aktif ? "aktif" : "non aktif"}
                    </span>
                    <div className="flex-1 flex flex-row justify-start items-center gap-1">
                      {/* icon update */}
                      <button
                        type="button"
                        className="p-1.5 bg-primary-blue rounded-sm"
                      >
                        <Pencil size={14} className="text-white" />
                      </button>
                      {/* icon delete */}
                      <button
                        disabled={isPendingDelete}
                        type="button"
                        className="p-1.5 bg-primary-red rounded-sm"
                        onClick={() => handleDeleteData(item.id)}
                      >
                        <Trash size={14} className="text-white" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <NoData />
              )}
            </div>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

// header title
type HeaderTitleProps = {
  title: string;
  icon: ReactNode;
};
const HeaderTitle: FC<HeaderTitleProps> = ({ icon, title }) => {
  return (
    <div className="w-full flex flex-row justify-between items-center pb-2 border-b border-b-primary-black/30">
      <h3 className="text-xl font-semibold text-secondary-blue">{title}</h3>

      {/* icon */}
      {icon}
    </div>
  );
};

// total data
type TotalDataProps = {
  lakiLaki: string;
  perempuan: string;
};
const TotalData: FC<TotalDataProps> = ({ lakiLaki, perempuan }) => {
  return (
    <div className="w-full flex flex-col justify-start items-start mt-4">
      {/* total */}
      <h4 className="font-medium text-primary-black text-base">Total Data :</h4>

      <div className="w-full h-20 lg:h-28 mt-3 flex flex-row justify-start items-center gap-3">
        {/* laki laki */}
        <div className="w-full h-full bg-primary-white shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] rounded-md hover:-translate-y-1 transition-all ease-in-out duration-300 flex flex-col justify-start items-start p-3">
          {/* title */}
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-xs lg:text-sm text-primary-black font-medium">
              Laki-laki
            </p>

            {/* icon */}
            <Mars size={24} className="text-secondary-blue hidden lg:block" />
          </div>

          {/* total data */}
          <span className="text-2xl lg:text-3xl font-semibold text-secondary-blue lg:mt-3">
            {lakiLaki}
          </span>
        </div>

        {/* perempuan */}
        <div className="w-full h-full bg-primary-white shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] rounded-md hover:-translate-y-1 transition-all ease-in-out duration-300 flex flex-col justify-start items-start p-3">
          {/* title */}
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-xs lg:text-sm text-primary-black font-medium">
              Perempuan
            </p>

            {/* icon */}
            <Venus size={24} className="text-pink-500 hidden lg:block" />
          </div>

          {/* total data */}
          <span className="text-2xl lg:text-3xl font-semibold text-secondary-blue lg:mt-3">
            {perempuan}
          </span>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
