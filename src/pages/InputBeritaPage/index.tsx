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
import BoxInputTextArea from "../../components/BoxInputTextArea";
import { NewsService } from "../../services/news.service";
import type { CreateNewsType, UpdateNewsType } from "../../models/news-model";
import { NewsValidation } from "../../validations/news-validation";
import BoxInputChoose from "../../components/BoxInputChoose";

// category list
const categoryList: string[] = ["berita", "artikel"];

const InputBeritaPage: FC = () => {
  // get id from params
  const idParam = useParams().id;
  const id = idParam ? Number(idParam) : undefined;

  const { data: dataNews, isLoading } = useQuery({
    queryKey: ["beritaForInput", id],
    queryFn: () => NewsService.detail(+id!),
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
  } = useForm<CreateNewsType | UpdateNewsType>({
    resolver: zodResolver(id ? NewsValidation.UPDATE : NewsValidation.CREATE),
  });

  // set value if id hotel is existing
  useEffect(() => {
    if (id && dataNews?.success) {
      reset({
        title: dataNews?.data.title,
        category: dataNews?.data.category,
        content: dataNews?.data.content,
      });
    }
  }, [id, dataNews?.success, reset]);

  //   use control for dokumen
  const fileController = useController({
    name: "thumbnail",
    control,
  });

  //   use control for category
  const categoryController = useController({
    name: "category",
    control,
  });

  //   use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: FormData) => {
      if (id && dataNews?.success && dataNews?.data) {
        return NewsService.update(+id, data);
      } else {
        return NewsService.create(data);
      }
    },

    onSuccess: () => {
      // navigate
      navigate("/dashboard/berita-artikel", {
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
  const onSubmit = async (data: CreateNewsType | UpdateNewsType) => {
    try {
      // form data
      const formData = new FormData();

      // data files
      if (data.thumbnail) {
        formData.append("news", data.thumbnail);
      }

      formData.append("title", data.title || "");
      formData.append("category", data.category || "");
      formData.append("content", data.content || "");

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
            {/* input title */}
            <BoxInputText
              register={register("title")}
              label="Judul Berita"
              name="title"
              placeholder="Masukan judul berita ..."
              errorMessage={errors.title?.message}
              required={true}
              max={200}
            />

            <BoxInputChoose<CreateNewsType | UpdateNewsType>
              controller={categoryController}
              label="Kategori Berita"
              required={true}
              hAuto={true}
              placeholder="Pilih kategori ..."
              defaultValue={
                dataNews?.success && dataNews?.data.category
                  ? dataNews?.data.category
                  : ""
              }
              chooseList={categoryList}
            />

            {/* input content */}
            <BoxInputTextArea
              register={register("content")}
              label="Konten Berita"
              name="content"
              placeholder="Masukan konten berita ..."
              errorMessage={errors.content?.message}
              required={true}
              max={2500}
            />

            {/* input gambar */}
            <BoxInputGambar<CreateNewsType | UpdateNewsType>
              label="Foto Berita"
              controller={fileController}
              required={false}
              clearError={() => clearErrors("thumbnail")}
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

export default InputBeritaPage;
