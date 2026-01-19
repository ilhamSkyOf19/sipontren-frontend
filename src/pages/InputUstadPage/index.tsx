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
import { UstadService } from "../../services/ustad.service";
import type {
  CreateUstadType,
  UpdateUstadType,
} from "../../models/ustad-model";
import { UstadValidation } from "../../validations/ustad-validation";
import BoxInputDate from "../../components/BoxInputDate";
import LoadingPulseFormulir from "../../components/LoadingPulseFormulir";

// janis kelamin
const jenisKelaminList: string[] = ["laki_laki", "perempuan"];

const InputUstadPage: FC = () => {
  // get id from params
  const idParam = useParams().id;
  const id = idParam ? Number(idParam) : undefined;

  const { data: dataUstad, isLoading } = useQuery({
    queryKey: ["ustadForInput", id],
    queryFn: () => UstadService.detail(+id!),
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
  } = useForm<CreateUstadType | Omit<UpdateUstadType, "id">>({
    resolver: zodResolver(id ? UstadValidation.UPDATE : UstadValidation.CREATE),
  });

  // set value if id hotel is existing
  useEffect(() => {
    if (id && dataUstad?.success) {
      reset({
        name: dataUstad.data.name,
        jabatan: dataUstad.data.jabatan,
        tempat_lahir: dataUstad.data.tempat_lahir,
        tanggal_lahir: dataUstad.data.tanggal_lahir,
        alamat: dataUstad.data.alamat,
        no_telepon: dataUstad.data.no_telepon,
        jenis_kelamin: dataUstad.data.jenis_kelamin,
      });
    }
  }, [id, dataUstad?.success, reset]);

  //   use control for dokumen
  const fileController = useController({
    name: "ustad_img",
    control,
  });

  //   use control for jenis kelamin
  const jenisKelaminController = useController({
    name: "jenis_kelamin",
    control,
  });

  //   use control for tanggal lahir
  const tanggalLahirController = useController({
    name: "tanggal_lahir",
    control,
  });

  //   use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: FormData) => {
      if (id && dataUstad?.success && dataUstad?.data) {
        return UstadService.update(+id, data);
      } else {
        return UstadService.create(data);
      }
    },
    onSuccess: () => {
      // navigate
      navigate("/dashboard/ustad", {
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
    data: CreateUstadType | Omit<UpdateUstadType, "id">,
  ) => {
    try {
      // form data
      const formData = new FormData();

      // data files
      if (data.ustad_img) {
        formData.append("ustad_img", data.ustad_img);
      }

      formData.append("name", data.name || "");
      formData.append("jabatan", data.jabatan || "");
      formData.append("tempat_lahir", data.tempat_lahir || "");
      formData.append("tanggal_lahir", data.tanggal_lahir || "");
      formData.append("alamat", data.alamat || "");
      formData.append("no_telepon", data.no_telepon || "");
      formData.append("jenis_kelamin", data.jenis_kelamin || "");

      await mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-full flex flex-col justify-start items-center relative overflow-hidden lg:pt-4 pb-32 md:items-start px-4">
      {/* header */}
      <HeaderDashboard
        title={id ? "Edit Ustad" : "Tambah Ustad"}
        subTitle={`${id ? "Edit" : "Tambahkan"} data ustad / ustadzah`}
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
              register={register("name")}
              label="Nama Ustad / Ustadzah"
              name="name"
              placeholder="Masukan nama ustad / ustadzah ..."
              errorMessage={errors.name?.message}
              required={true}
              max={50}
            />

            {/* input jenis kelamin */}
            <BoxInputChoose<CreateUstadType | Omit<UpdateUstadType, "id">>
              controller={jenisKelaminController}
              label="Jenis Kelamin"
              required={true}
              hAuto={true}
              placeholder="Pilih jenis kelamin ..."
              defaultValue={
                dataUstad?.success && dataUstad?.data.jenis_kelamin
                  ? dataUstad?.data.jenis_kelamin
                  : ""
              }
              chooseList={jenisKelaminList}
            />

            {/* input jabatan */}
            <BoxInputText
              register={register("jabatan")}
              label="Jabatan"
              name="jabatan"
              placeholder="Masukan jabatan ..."
              errorMessage={errors.jabatan?.message}
              required={true}
              max={50}
            />

            {/* input jabatan */}
            <BoxInputText
              register={register("alamat")}
              label="Alamat"
              name="alamat"
              placeholder="Masukan alamat ..."
              errorMessage={errors.alamat?.message}
              required={true}
              max={100}
            />

            {/* input tempat lahir */}
            <BoxInputText
              register={register("tempat_lahir")}
              label="Tempat Lahir"
              name="tempat_lahir"
              placeholder="Masukan tempat lahir ..."
              errorMessage={errors.tempat_lahir?.message}
              required={true}
              max={50}
            />

            <BoxInputDate<CreateUstadType | Omit<UpdateUstadType, "id">>
              controller={tanggalLahirController}
              label="Tanggal Lahir"
              required={true}
              oldValue={
                dataUstad?.success
                  ? new Date(dataUstad?.data?.tanggal_lahir)
                  : undefined
              }
            />

            {/* input no telepon */}
            <BoxInputText
              register={register("no_telepon")}
              label="No Telepon / Whatsapp"
              name="no_telepon"
              placeholder="Masukan no telepon ..."
              errorMessage={errors.no_telepon?.message}
              required={true}
              max={14}
            />

            {/* input img alumni */}
            <BoxInputGambar<CreateUstadType | Omit<UpdateUstadType, "id">>
              label="Foto Ustad / Ustadzah"
              controller={fileController}
              required={false}
              clearError={() => clearErrors("ustad_img")}
            />

            {/* action */}
            <div className="w-full flex flex-row justify-between items-center gap-4 mt-6">
              {/* button back */}
              <ButtonBack link="/dashboard/alumni" />

              {/* button submit */}
              <ButtonSubmit label="Simpan" loading={isPending} />
            </div>
          </>
        )}
      </form>
    </main>
  );
};

export default InputUstadPage;
