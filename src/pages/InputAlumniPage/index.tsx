import { useEffect, type FC } from "react";
import HeaderDashboard from "../../components/HeaderDashboard";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlumniService } from "../../services/alumni.service";
import { useController, useForm } from "react-hook-form";
import type {
  CreateAlumniType,
  UpdateAlumniType,
} from "../../models/alumni-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlumniValidation } from "../../validations/alumni-validation";
import BoxInputText from "../../components/BoxInputText";
import BoxInputChoose from "../../components/BoxInputChoose";
import BoxInputTextArea from "../../components/BoxInputTextArea";
import BoxInputGambar from "../../components/BoxInputGambar";
import ButtonSubmit from "../../components/ButtonSubmit";
import ButtonBack from "../../components/ButtonBack";
import LoadingPulseFormulir from "../../components/LoadingPulseFormulir";

// choose list
const chooseList: string[] = [
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
];

const InputAlumniPage: FC = () => {
  // get id from params
  const idParam = useParams().id;
  const id = idParam ? Number(idParam) : undefined;

  const { data: dataAlumni, isLoading } = useQuery({
    queryKey: ["alumniForInput", id],
    queryFn: () => AlumniService.detail(+id!),
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
  } = useForm<CreateAlumniType | Omit<UpdateAlumniType, "id">>({
    resolver: zodResolver(
      id ? AlumniValidation.UPDATE : AlumniValidation.CREATE,
    ),
  });

  // set value if id hotel is existing
  useEffect(() => {
    if (id && dataAlumni?.success) {
      reset({
        angkatan: dataAlumni.data.angkatan,
        name: dataAlumni.data.name,
        description: dataAlumni.data.description,
      });
    }
  }, [id, dataAlumni?.success, reset]);

  //   use control for dokumen
  const fileController = useController({
    name: "img_alumni",
    control,
  });

  //   use control for choose angkatan
  const angkatanController = useController({
    name: "angkatan",
    control,
  });

  //   use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: FormData) => {
      if (id && dataAlumni?.success && dataAlumni?.data) {
        return AlumniService.update(+id, data);
      } else {
        return AlumniService.create(data);
      }
    },
    onSuccess: () => {
      // navigate
      navigate("/dashboard/alumni", {
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
    data: CreateAlumniType | Omit<UpdateAlumniType, "id">,
  ) => {
    try {
      // form data
      const formData = new FormData();

      // data files
      if (data.img_alumni) {
        formData.append("img_alumni", data.img_alumni);
      }

      formData.append("name", data.name || "");
      formData.append("angkatan", data.angkatan || "");
      formData.append("description", data.description || "");

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
              register={register("name")}
              label="Nama Alumni"
              name="name"
              placeholder="Masukan nama alumni ..."
              errorMessage={errors.name?.message}
              required={true}
            />

            {/* input angkatan */}
            <BoxInputChoose<CreateAlumniType | Omit<UpdateAlumniType, "id">>
              controller={angkatanController}
              label="Angkatan Alumni"
              required={true}
              defaultValue={
                dataAlumni?.success && dataAlumni?.data.angkatan
                  ? dataAlumni?.data.angkatan
                  : ""
              }
              chooseList={chooseList}
            />

            {/* input description */}
            <BoxInputTextArea
              register={register("description")}
              label="Deskripsi Alumni"
              name="description"
              placeholder="Masukan deskripsi alumni ..."
              errorMessage={errors.description?.message}
              required={true}
            />

            {/* input img alumni */}
            <BoxInputGambar<CreateAlumniType | Omit<UpdateAlumniType, "id">>
              label="Foto Alumni"
              controller={fileController}
              required={true}
              clearError={() => clearErrors("img_alumni")}
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

export default InputAlumniPage;
