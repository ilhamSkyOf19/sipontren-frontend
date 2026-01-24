import { useEffect, type FC } from "react";
import HeaderDashboard from "../../components/HeaderDashboard";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BoxInputText from "../../components/BoxInputText";
import BoxInputChoose from "../../components/BoxInputChoose";
import BoxInputGambar from "../../components/BoxInputGambar";
import ButtonSubmit from "../../components/ButtonSubmit";
import ButtonBack from "../../components/ButtonBack";
import LoadingPulseFormulir from "../../components/LoadingPulseFormulir";
import { PrestasiService } from "../../services/prestasi.service";
import type {
  CategoryPrestasi,
  CreatePrestasiType,
  UpdatePrestasiType,
} from "../../models/prestasi-model";
import { PrestasiValidation } from "../../validations/prestasi-validation";

// choose list
const tahunPrestasiList: string[] = [
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "2031",
  "2032",
  "2033",
  "2034",
  "2035",
  "2036",
  "2037",
  "2038",
  "2039",
  "2040",
];

// tingkat list
const tingkatList: CategoryPrestasi[] = [
  "internasional",
  "nasional",
  "provinsi",
  "kabupaten",
  "kecamatan",
];

// jenis kelamin list
const jenisKelaminList: string[] = ["laki_laki", "perempuan"];

const InputPrestasiPage: FC = () => {
  // get id from params
  const idParam = useParams().id;
  const id = idParam ? Number(idParam) : undefined;

  const { data: dataPrestasi, isLoading } = useQuery({
    queryKey: ["prestasiForInput", id],
    queryFn: () => PrestasiService.detail(+id!),
    enabled: typeof id === "number" && !isNaN(id),
  });

  // navigate
  const navigate = useNavigate();
  // use form
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    clearErrors,
  } = useForm<CreatePrestasiType | Omit<UpdatePrestasiType, "id">>({
    resolver: zodResolver(
      id ? PrestasiValidation.UPDATE : PrestasiValidation.CREATE,
    ),
  });

  // set value if id hotel is existing
  useEffect(() => {
    if (id && dataPrestasi?.success) {
      reset({
        nama: dataPrestasi.data.nama,
        category_prestasi: dataPrestasi.data.category_prestasi,
        tahun_prestasi: dataPrestasi.data.tahun_prestasi.toString(),
        jenis_kelamin: dataPrestasi.data.jenis_kelamin,
        prestasi: dataPrestasi.data.prestasi,
      });
    }
  }, [id, dataPrestasi?.success, reset]);

  //   use control for dokumen
  const fileController = useController({
    name: "photo",
    control,
  });

  //   use control jenis kelamin
  const jenisKelaminController = useController({
    name: "jenis_kelamin",
    control,
  });

  //   use control category prestasi
  const categoryPrestasiController = useController({
    name: "category_prestasi",
    control,
  });

  //   use control tahun prestasi
  const tahunPrestasiController = useController({
    name: "tahun_prestasi",
    control,
  });

  //   use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: FormData) => {
      if (id && dataPrestasi?.success && dataPrestasi?.data) {
        return PrestasiService.update(+id, data);
      } else {
        return PrestasiService.create(data);
      }
    },
    onSuccess: () => {
      // navigate
      navigate("/dashboard/prestasi", {
        state: {
          success: true,
          message: "berhasil tambah data",
        },
      });

      //   reset
      reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // handle submit
  const onSubmit = async (
    data: CreatePrestasiType | Omit<UpdatePrestasiType, "id">,
  ) => {
    try {
      // form data
      const formData = new FormData();

      // data files
      if (data.photo) {
        formData.append("photo", data.photo);
      }

      formData.append("nama", data.nama || "");
      formData.append("category_prestasi", data.category_prestasi || "");
      formData.append("tahun_prestasi", data.tahun_prestasi || "");
      formData.append("jenis_kelamin", data.jenis_kelamin || "");
      formData.append("prestasi", data.prestasi || "");

      await mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-full flex flex-col justify-start items-center relative overflow-hidden lg:pt-4 pb-32 md:items-start px-4">
      {/* header */}
      <HeaderDashboard
        title={id ? "Edit Prestasi" : "Tambah Prestasi"}
        subTitle={`${id ? "Edit" : "Tambahkan"} data prestasi baru ke dalam sistem pendataan pondok.`}
        tanggal={true}
      />

      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-start items-start mt-8 lg:w-[40vw]"
      >
        {isLoading ? (
          <LoadingPulseFormulir />
        ) : (
          <>
            {/* input name */}
            <BoxInputText
              register={register("nama")}
              label="Nama Santri"
              name="nama"
              placeholder="Masukan nama santri ..."
              errorMessage={errors.nama?.message}
              required={true}
              max={50}
            />

            {/* input tingkat prestasi */}
            <BoxInputChoose<CreatePrestasiType | Omit<UpdatePrestasiType, "id">>
              controller={categoryPrestasiController}
              label="Tingkat Prestasi"
              placeholder="Pilih Tingkat Prestasi"
              required={true}
              defaultValue={
                dataPrestasi?.success && dataPrestasi?.data.category_prestasi
                  ? dataPrestasi?.data.category_prestasi
                  : ""
              }
              chooseList={tingkatList}
            />

            {/* input tingkat prestasi */}
            <BoxInputChoose<CreatePrestasiType | Omit<UpdatePrestasiType, "id">>
              controller={tahunPrestasiController}
              label="Tahun Prestasi"
              placeholder="Pilih Tahun Prestasi"
              required={true}
              defaultValue={
                dataPrestasi?.success &&
                dataPrestasi?.data.tahun_prestasi.toString()
                  ? dataPrestasi?.data.tahun_prestasi.toString()
                  : ""
              }
              chooseList={tahunPrestasiList}
            />

            {/* input tahun prestasi */}
            <BoxInputChoose<CreatePrestasiType | Omit<UpdatePrestasiType, "id">>
              controller={jenisKelaminController}
              label="Jenis Kelamin"
              placeholder="Pilih Jenis Kelamin"
              required={true}
              defaultValue={
                dataPrestasi?.success && dataPrestasi?.data.jenis_kelamin
                  ? dataPrestasi?.data.jenis_kelamin
                  : ""
              }
              chooseList={jenisKelaminList}
              hAuto={true}
            />

            {/* input description */}
            <BoxInputText
              register={register("prestasi")}
              label="Deskripsi Prestasi"
              name="prestasi"
              placeholder="Masukan deskripsi prestasi ..."
              errorMessage={errors.prestasi?.message}
              required={true}
              max={250}
            />

            {/* input img alumni */}
            <BoxInputGambar<CreatePrestasiType | Omit<UpdatePrestasiType, "id">>
              label="Foto Santri"
              controller={fileController}
              required={true}
              clearError={() => clearErrors("photo")}
            />

            {/* action */}
            <div className="w-full flex flex-row justify-between items-center gap-4 mt-6">
              {/* button back */}
              <ButtonBack link="/dashboard/prestasi" />

              {/* button submit */}
              <ButtonSubmit label="Simpan" loading={isPending} />
            </div>
          </>
        )}
      </form>
    </main>
  );
};

export default InputPrestasiPage;
