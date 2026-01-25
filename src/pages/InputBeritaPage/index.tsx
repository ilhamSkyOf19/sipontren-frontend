import { useEffect, useState, type FC } from "react";
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
import { Minus, Plus } from "lucide-react";
import clsx from "clsx";
import ErrorMessageInput from "../../components/ErrorMessageInput";

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

  // state link berita delete
  const [isLinkBeritaDelete, setIsLinkBeritaDelete] = useState<
    {
      id: number;
      label?: string;
      link?: string;
      action: "update" | "delete";
    }[]
  >([]);

  // state no preview link berita
  const [noPreviewLinkBerita, setNoPreviewLinkBerita] = useState<number[]>([]);

  // handle
  const handleSetIsLinkBeritaDelete = (
    value: {
      id: number;
      label?: string;
      link?: string;
      action: "update" | "delete";
    },
    index: number,
  ) => {
    setIsLinkBeritaDelete((prev) => [...prev, value]);

    // set no preview link berita
    setNoPreviewLinkBerita((prev) => [...prev, index]);
  };

  // state count input link berita
  const [countInputLinkBerita, setCountInputLinkBerita] = useState<number>(1);

  // state link berita
  const [isLinkBerita, setIsLinkBerita] = useState<
    { label: string; link: string }[]
  >([]);

  // handle set is link berita
  const handleSetIsLinkBerita = (
    index: number,
    value: { label: string; link: string },
  ) => {
    setIsLinkBerita((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  // handle set is link berita
  const handleDeleteIsLinkBerita = (index: number) => {
    setIsLinkBerita((prev) => prev.filter((_, i) => i !== index));
  };

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

      // set link berita
      const cleanedLinkBerita = isLinkBerita.filter(
        (item): item is { label: string; link: string } =>
          item !== null && item !== undefined && !!item.label && !!item.link,
      );

      if (cleanedLinkBerita.length > 0) {
        formData.append("link_berita", JSON.stringify(cleanedLinkBerita));
      }

      // update link berita
      if (id) {
        formData.append(
          "update_link_berita",
          JSON.stringify(isLinkBeritaDelete),
        );
      }

      // use mutate
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

            <div className="w-full flex flex-col justify-start items-start mb-4">
              {/* header */}
              <div className="w-full flex flex-row justify-between items-center">
                {/* label */}
                <p className="text-base">Link Berita (Jika ada)</p>

                {/* button add */}
                <button
                  type="button"
                  className="p-2 flex flex-col justify-center items-center bg-primary-green rounded-full"
                  onClick={() => setCountInputLinkBerita((prev) => prev + 1)}
                >
                  <Plus className="text-primary-white" />
                </button>
              </div>

              <div
                className={clsx(
                  "w-full flex flex-col justify-start items-start",
                  id && "",
                )}
              >
                {dataNews?.success &&
                  dataNews.data.link_berita &&
                  dataNews.data.link_berita?.length > 0 && (
                    <div className="w-full flex flex-col justify-start items-start gap-4 mt-4">
                      {dataNews.data.link_berita.map((item, index) => {
                        if (noPreviewLinkBerita.includes(index)) return null;

                        return (
                          <div
                            key={item.id}
                            className="w-full flex flex-row justify-between items-center"
                          >
                            <div className="flex flex-col justify-start items-start">
                              {/* label */}
                              <p className="text-sm text-primary-black">
                                {item.label}
                              </p>

                              {/* link */}
                              <a
                                href={item.link}
                                target="_blank"
                                className="text-sm text-secondary-blue underline"
                              >
                                {item.link}
                              </a>
                            </div>

                            {/* button delete */}
                            <button
                              type="button"
                              className="p-0.5 flex justify-center items-center bg-primary-red rounded-full"
                              onClick={() =>
                                handleSetIsLinkBeritaDelete(
                                  {
                                    action: "delete",
                                    id: item.id,
                                  },
                                  index,
                                )
                              }
                            >
                              <Minus className="text-primary-white" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                {Array.from({ length: countInputLinkBerita }).map(
                  (_, index) => (
                    <InputLinkBerita
                      key={index}
                      index={index + 1}
                      handleSetIsLinkBerita={handleSetIsLinkBerita}
                      handleDeleteIsLinkBerita={handleDeleteIsLinkBerita}
                    />
                  ),
                )}
              </div>
            </div>

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

// component input link berita
type Props = {
  index: number;
  errorMessageLabel?: string;
  errorMessageLink?: string;
  handleSetIsLinkBerita: (
    index: number,
    value: { label: string; link: string },
  ) => void;
  handleDeleteIsLinkBerita: (index: number) => void;
  defaultValues?: { label: string; link: string };
};
const InputLinkBerita: FC<Props> = ({
  handleSetIsLinkBerita,
  errorMessageLabel,
  errorMessageLink,
  index,
  handleDeleteIsLinkBerita,
  defaultValues,
}) => {
  // state value
  const [isValue, setIsValue] = useState<{ label: string; link: string }>({
    label: "",
    link: "",
  });

  // debounce and set value if label && link not empty
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isValue.label && isValue.link) {
        handleSetIsLinkBerita(index, isValue);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [isValue]);

  return (
    <div className="w-full flex flex-col justify-start items-start py-3 border-b border-secondary-blue">
      {/* label */}
      <div className="w-full flex flex-col justify-start items-start">
        {/* label */}
        <div className="w-full text-base relative flex flex-row justify-between items-center">
          <div className="flex-2 relative">
            <label>Label Link {index}</label>
          </div>

          {/* max */}
          <span className="text-xs">{isValue.label.length}/100</span>
        </div>

        <div
          className={clsx(
            "w-full px-4 py-1 h-11 border border-secondary-blue rounded-lg mt-2 focus-within:shadow-[0_4px_6px_0_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out focus-within:-translate-y-1",
            errorMessageLabel && "border-primary-red",
          )}
        >
          <input
            type={"text"}
            placeholder="Masukan label link ..."
            className="w-full h-full border-none outline-none text-base placeholder:text-sm"
            maxLength={100}
            value={
              defaultValues?.label && isValue.label === ""
                ? defaultValues.label
                : isValue.label
            }
            onChange={(e) => setIsValue({ ...isValue, label: e.target.value })}
          />
        </div>

        {/* error message */}
        <ErrorMessageInput errorMessage={errorMessageLabel} />
      </div>

      {/* link */}
      <div className="w-full flex flex-col justify-start items-start">
        {/* label */}
        <div className="w-full text-base relative flex flex-row justify-between items-center">
          <div className="flex-2 relative">
            <label>Link {index}</label>
          </div>

          {/* max */}
          <span className="text-xs">{isValue.link.length}/200</span>
        </div>

        <div
          className={clsx(
            "w-full px-4 py-1 h-11 border border-secondary-blue rounded-lg mt-2 focus-within:shadow-[0_4px_6px_0_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out focus-within:-translate-y-1",
            errorMessageLink && "border-primary-red",
          )}
        >
          <input
            type={"text"}
            placeholder="Masukan link ..."
            className="w-full h-full border-none outline-none text-base placeholder:text-sm"
            maxLength={200}
            value={
              defaultValues?.link && isValue.link === ""
                ? defaultValues.link
                : isValue.link
            }
            onChange={(e) => setIsValue({ ...isValue, link: e.target.value })}
          />
        </div>

        {/* error message */}
        <ErrorMessageInput errorMessage={errorMessageLink} />
      </div>

      {/* delete */}
      <div className="w-full flex flex-row justify-end items-center">
        <button
          type="button"
          className="p-2 flex flex-col justify-center items-center bg-primary-red rounded-full"
          onClick={() => handleDeleteIsLinkBerita(index - 1)}
        >
          <Minus className="text-primary-white" />
        </button>
      </div>
    </div>
  );
};

export default InputBeritaPage;
