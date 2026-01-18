import { useEffect, type FC } from "react";
import HeaderDashboard from "../../components/HeaderDashboard";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BoxInputText from "../../components/BoxInputText";
import BoxInputGambar from "../../components/BoxInputGambar";
import ButtonSubmit from "../../components/ButtonSubmit";
import ButtonBack from "../../components/ButtonBack";
import LoadingPulseFormulir from "../../components/LoadingPulseFormulir";
import { FasilitasService } from "../../services/fasilitas.service";
import type {
  CreateFasilitasType,
  UpdateFasilitasType,
} from "../../models/fasilitas-model";
import { FasilitasValidation } from "../../validations/fasilitas-validation";
import BoxInputTextArea from "../../components/BoxInputTextArea";

const InputFasilitasPage: FC = () => {
  // get id from params
  const idParam = useParams().id;
  const id = idParam ? Number(idParam) : undefined;

  const { data: dataFasilitas, isLoading } = useQuery({
    queryKey: ["fasilitasForInput", id],
    queryFn: () => FasilitasService.detail(+id!),
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
  } = useForm<CreateFasilitasType | UpdateFasilitasType>({
    resolver: zodResolver(
      id ? FasilitasValidation.UPDATE : FasilitasValidation.CREATE,
    ),
  });

  // set value if id hotel is existing
  useEffect(() => {
    if (id && dataFasilitas?.success) {
      reset({
        fasilitas: dataFasilitas.data.fasilitas,
        keterangan: dataFasilitas.data.keterangan,
      });
    }
  }, [id, dataFasilitas?.success, reset]);

  //   use control for dokumen
  const fileController = useController({
    name: "images",
    control,
  });

  //   use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: FormData) => {
      if (id && dataFasilitas?.success && dataFasilitas?.data) {
        return FasilitasService.update(+id, data);
      } else {
        return FasilitasService.create(data);
      }
    },
    onSuccess: () => {
      // navigate
      navigate("/dashboard/fasilitas", {
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
  const onSubmit = async (data: CreateFasilitasType | UpdateFasilitasType) => {
    try {
      // form data
      const formData = new FormData();

      // data files
      if (data.images) {
        formData.append("images", data.images);
      }

      formData.append("fasilitas", data.fasilitas || "");
      formData.append("keterangan", data.keterangan || "");

      await mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-full flex flex-col justify-start items-center relative overflow-hidden lg:pt-4 pb-32 md:items-start px-4">
      {/* header */}
      <HeaderDashboard
        title="Tambah Alumni"
        subTitle="Tambahkan data alumni baru ke dalam sistem pendataan pondok."
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
              register={register("fasilitas")}
              label="Nama Fasilitas"
              name="fasilitas"
              placeholder="Masukan nama fasilitas ..."
              errorMessage={errors.fasilitas?.message}
              required={true}
              max={100}
            />

            {/* input keterangan */}
            <BoxInputTextArea
              register={register("keterangan")}
              label="Keterangan"
              name="keterangan"
              placeholder="Masukan nama keterangan ..."
              errorMessage={errors.keterangan?.message}
              required={true}
              max={70}
            />

            {/* input img alumni */}
            <BoxInputGambar<CreateFasilitasType | UpdateFasilitasType>
              label="Foto Fasilitas"
              controller={fileController}
              required={false}
              clearError={() => clearErrors("images")}
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

export default InputFasilitasPage;
