import { type FC } from "react";
import HeaderDashboard from "../../components/HeaderDashboard";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BoxInputGambar from "../../components/BoxInputGambar";
import ButtonSubmit from "../../components/ButtonSubmit";
import ButtonBack from "../../components/ButtonBack";
import LoadingPulseFormulir from "../../components/LoadingPulseFormulir";
import { PamfletService } from "../../services/pamflet.service";
import type {
  CreatePamfletType,
  UpdatePamfletType,
} from "../../models/pamflet-model";
import { PamfletValidation } from "../../validations/pamflet-validation";

const InputPamfletPage: FC = () => {
  // get id from params
  const idParam = useParams().id;
  const id = idParam ? Number(idParam) : undefined;

  const { data: dataPamflet, isLoading } = useQuery({
    queryKey: ["pamfletForInput", id],
    queryFn: () => PamfletService.detail(+id!),
    enabled: typeof id === "number" && !isNaN(id),
  });

  // navigate
  const navigate = useNavigate();
  // use form
  const { handleSubmit, control, reset, clearErrors } = useForm<
    CreatePamfletType | Omit<UpdatePamfletType, "id">
  >({
    resolver: zodResolver(
      id ? PamfletValidation.UPDATE : PamfletValidation.CREATE,
    ),
  });

  //   use control for dokumen
  const fileController = useController({
    name: "pamflet",
    control,
  });

  //   use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: FormData) => {
      if (id && dataPamflet?.success && dataPamflet?.data) {
        return PamfletService.update(+id, data);
      } else {
        return PamfletService.create(data);
      }
    },
    onSuccess: () => {
      // navigate
      navigate("/dashboard/pamflet", {
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
    data: CreatePamfletType | Omit<UpdatePamfletType, "id">,
  ) => {
    try {
      // form data
      const formData = new FormData();

      // data files
      if (data.pamflet) {
        formData.append("pamflet", data.pamflet);
      }

      await mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-full flex flex-col justify-start items-center relative overflow-hidden lg:pt-4 pb-32 md:items-start px-4">
      {/* header */}
      <HeaderDashboard
        title={id ? "Edit Pamflet" : "Tambah Pamflet"}
        subTitle={`${id ? "Edit" : "Tambah"} data pamflet baru ke dalam sistem pendataan pondok.`}
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
            {/* input img  */}
            <BoxInputGambar<CreatePamfletType | Omit<UpdatePamfletType, "id">>
              label="Pamflet ukuran (1920x500)"
              controller={fileController}
              required={false}
              clearError={() => clearErrors("pamflet")}
              previewPamflet={true}
            />

            {/* action */}
            <div className="w-full flex flex-row justify-between items-center gap-4 mt-6">
              {/* button back */}
              <ButtonBack link="/dashboard/pamflet" />

              {/* button submit */}
              <ButtonSubmit label="Simpan" loading={isPending} />
            </div>
          </>
        )}
      </form>
    </main>
  );
};

export default InputPamfletPage;
