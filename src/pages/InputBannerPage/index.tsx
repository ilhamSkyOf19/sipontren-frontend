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
import { BannerService } from "../../services/banner.service";
import type {
  CreateBannerType,
  UpdateBannerType,
} from "../../models/banner-model";
import { BannerValidation } from "../../validations/banner-validation";

const InputBannerPage: FC = () => {
  // get id from params
  const idParam = useParams().id;
  const id = idParam ? Number(idParam) : undefined;

  const { data: dataBanner, isLoading } = useQuery({
    queryKey: ["bannerForInput", id],
    queryFn: () => BannerService.detail(+id!),
    enabled: typeof id === "number" && !isNaN(id),
  });

  // navigate
  const navigate = useNavigate();
  // use form
  const { handleSubmit, control, reset, clearErrors } = useForm<
    CreateBannerType | Omit<UpdateBannerType, "id">
  >({
    resolver: zodResolver(
      id ? BannerValidation.UPDATE : BannerValidation.CREATE,
    ),
  });

  //   use control for dokumen
  const fileController = useController({
    name: "img",
    control,
  });

  //   use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: FormData) => {
      if (id && dataBanner?.success && dataBanner?.data) {
        return BannerService.update(+id, data);
      } else {
        return BannerService.create(data);
      }
    },
    onSuccess: () => {
      // navigate
      navigate("/dashboard/banner", {
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
    data: CreateBannerType | Omit<UpdateBannerType, "id">,
  ) => {
    try {
      // form data
      const formData = new FormData();

      // data files
      if (data.img) {
        formData.append("banner", data.img);
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
        title={id ? "Edit Banner" : "Tambah Banner"}
        subTitle={`${id ? "Edit" : "Tambah"} data banner baru ke dalam sistem pendataan pondok.`}
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
            <BoxInputGambar<CreateBannerType | Omit<UpdateBannerType, "id">>
              label="Banner ukuran (1920x500)"
              controller={fileController}
              required={false}
              clearError={() => clearErrors("img")}
              fullPreview={true}
            />

            {/* action */}
            <div className="w-full flex flex-row justify-between items-center gap-4 mt-6">
              {/* button back */}
              <ButtonBack link="/dashboard/banner" />

              {/* button submit */}
              <ButtonSubmit label="Simpan" loading={isPending} />
            </div>
          </>
        )}
      </form>
    </main>
  );
};

export default InputBannerPage;
