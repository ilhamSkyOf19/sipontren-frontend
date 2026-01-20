import { useEffect, type FC } from "react";
import HeaderPage from "../../components/HeaderPage";
import BoxInputChoose from "../../components/BoxInputChoose";
import { useController, useForm } from "react-hook-form";
import type {
  CreateStudentType,
  UpdateStudentType,
} from "../../models/student-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { StudentValidation } from "../../validations/student-validation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { StudentService } from "../../services/student.service";
import SubJudulLeft from "../../components/SubJudulLeft";
import SubJudulCenter from "../../components/SubJudulCenter";
import BoxInputText from "../../components/BoxInputText";
import BoxInputNumber from "../../components/BoxInputNumber";
import BoxInputDate from "../../components/BoxInputDate";
import type { CreateUstadType } from "../../models/ustad-model";
import BoxInputGambar from "../../components/BoxInputGambar";
import ButtonSubmit from "../../components/ButtonSubmit";
import clsx from "clsx";
import HeaderDashboard from "../../components/HeaderDashboard";
import ButtonBack from "../../components/ButtonBack";
import closedIcon from "../../assets/icons/closed.webp";
import Seo from "../../components/Seo";

// list jenis sekolah
const jenisSekolahList: string[] = ["SD", "SMP", "SMA"];

const imageFields = [
  { key: "foto_formal", label: "Foto Formal" },
  { key: "fc_kis_kip", label: "FC KIS / KIP" },
  { key: "fc_akta_kelahiran", label: "FC Akta Kelahiran" },
  { key: "fc_ktp", label: "FC KTP" },
  { key: "foto_kk", label: "Foto Kartu Keluarga" },
] as const;

const FormulirPendaftaranPage: FC = () => {
  const psbOpen: boolean = false;

  //   window top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // navigate
  const navigate = useNavigate();

  // macth url
  const admin = useMatch("/dashboard/calon-santri/edit/:id");

  // get id
  const { id } = useParams();

  // use form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<CreateStudentType | UpdateStudentType>({
    resolver: zodResolver(
      id ? StudentValidation.UPDATE : StudentValidation.CREATE,
    ),
  });

  const fieldsController = {
    tanggalLahir: useController({ name: "tanggal_lahir", control }),
    jenisKelamin: useController({ name: "jenis_kelamin", control }),
    jenisSekolah: useController({ name: "jenis_sekolah", control }),
    fotoFormal: useController({ name: "foto_formal", control }),
    fcKis: useController({ name: "fc_kis_kip", control }),
    fcAkta: useController({ name: "fc_akta_kelahiran", control }),
    fcKtp: useController({ name: "fc_ktp", control }),
    fotoKK: useController({ name: "foto_kk", control }),
  };

  //   get student
  const { data: dataStudent } = useQuery({
    queryKey: ["studentForDashboard", id],
    queryFn: () => {
      return StudentService.detail(+id!);
    },
    enabled: typeof id === "string" && !isNaN(+id) && admin !== null && psbOpen,
  });

  //   mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: FormData) => {
      if (id) {
        return StudentService.update(+id, data);
      } else {
        return StudentService.create(data);
      }
    },
    onSuccess: (data) => {
      //   navigate
      if (data.success) {
        // reset
        reset();

        // navigate
        navigate("/success", {
          state: {
            name: data.data?.nama_lengkap,
          },
        });
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //   set value
  useEffect(() => {
    if (id && dataStudent?.success) {
      const d = dataStudent.data;

      reset({
        jenis_sekolah: d.jenis_sekolah,
        nisn: d.nisn,
        nik: d.nik,
        nama_lengkap: d.nama_lengkap,
        jenis_kelamin: d.jenis_kelamin,
        usia: d.usia,
        tempat_lahir: d.tempat_lahir,
        tanggal_lahir: d.tanggal_lahir.toString(),
        alamat: d.alamat,
        no_telepon: d.no_telepon,
        anak_ke: d.anak_ke,
        jumlah_saudara: d.jumlah_saudara,
        asal_sekolah: d.asal_sekolah,
        alamat_sekolah_asal: d.alamat_sekolah_asal,
        nama_lengkap_ayah: d.nama_lengkap_ayah,
        nama_lengkap_ibu: d.nama_lengkap_ibu,
        nama_lengkap_wali: d.nama_lengkap_wali ?? "",
      });
    }
  }, [id, dataStudent?.success, reset]);

  // handle submit
  const onSubmit = async (data: CreateStudentType | UpdateStudentType) => {
    try {
      // form data
      const formData = new FormData();

      // ============== DATA FILES ==============
      if (data.foto_formal) {
        formData.append("foto_formal", data.foto_formal);
      }

      if (data.fc_kis_kip) {
        formData.append("fc_kis_kip", data.fc_kis_kip);
      }

      if (data.fc_akta_kelahiran) {
        formData.append("fc_akta_kelahiran", data.fc_akta_kelahiran);
      }

      if (data.fc_ktp) {
        formData.append("fc_ktp", data.fc_ktp);
      }

      if (data.foto_kk) {
        formData.append("foto_kk", data.foto_kk);
      }

      // ============== DATA TEXT ==============

      formData.append("jenis_sekolah", data.jenis_sekolah || "");
      formData.append("nisn", data.nisn || "");
      formData.append("nik", data.nik || "");
      formData.append("nama_lengkap", data.nama_lengkap || "");
      formData.append("jenis_kelamin", data.jenis_kelamin || "");

      // number → string
      formData.append("usia", data.usia ? String(data.usia) : "");

      formData.append("tempat_lahir", data.tempat_lahir || "");
      formData.append("tanggal_lahir", data.tanggal_lahir || "");
      formData.append("alamat", data.alamat || "");
      formData.append("no_telepon", data.no_telepon || "");

      // number → string
      formData.append("anak_ke", data.anak_ke ? String(data.anak_ke) : "");
      formData.append(
        "jumlah_saudara",
        data.jumlah_saudara ? String(data.jumlah_saudara) : "",
      );

      formData.append("asal_sekolah", data.asal_sekolah || "");
      formData.append("alamat_sekolah_asal", data.alamat_sekolah_asal || "");

      formData.append("nama_lengkap_ayah", data.nama_lengkap_ayah || "");
      formData.append("nama_lengkap_ibu", data.nama_lengkap_ibu || "");

      // optional
      formData.append("nama_lengkap_wali", data.nama_lengkap_wali || "");

      await mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }
  };

  // render
  return (
    <>
      <Seo
        path="/formulir"
        title="Formulir Pendaftaran Santri Ponpes Al-Amin Seputih Banyak"
        description="Isi formulir pendaftaran santri baru Pondok Pesantren Muhammadiyah Al-Amin Seputih Banyak. Layanan pendaftaran online cepat dan aman, untuk calon santri."
        keywords="formulir pendaftaran santri, psb ponpes al-amin, daftar santri seputih banyak"
        schema={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Pondok Pesantren Muhammadiyah Al-Amin",
          alternateName: "Ponpes Al-Amin Seputih Banyak",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Seputih Banyak",
            addressRegion: "Lampung Tengah",
            addressCountry: "ID",
          },
          hasCourse: [
            {
              "@type": "Course",
              name: "Formulir Pendaftaran Santri Baru",
              description:
                "Formulir resmi pendaftaran santri baru di Pondok Pesantren Muhammadiyah Al-Amin, lengkap dan online.",
            },
          ],
        }}
      />

      <main
        className={clsx(
          "w-full flex flex-col justify-start items-center overflow-hidden",
          !admin ? "h-full" : "pb-16",
        )}
      >
        {psbOpen ? (
          <div className="w-full h-screen flex flex-col justify-center items-center px-2 lg:w-auto">
            <div className="relative w-full flex flex-col justify-center items-center gap-4">
              <h3 className="text-3xl text-secondary-blue font-semibold text-center lg:text-5xl">
                Mohon Maaf
              </h3>
              <p className="text-base text-primary-blue text-center">
                Pendaftaran Santri Baru telah{" "}
                <span className="py-1 px-4 bg-secondary-blue rounded-sm text-white font-medium">
                  ditutup
                </span>{" "}
                , Silahkan hubungi kontak kami.
              </p>

              {/* img */}
              <img
                src={closedIcon}
                alt="icon close"
                className="w-24 absolute right-14 top-full lg:w-48 animate-fade-in"
              />
            </div>
          </div>
        ) : (
          <>
            {!admin && (
              <HeaderPage
                whiteText1="Formulir Pendaftaran"
                whiteText2="Ponpes Al-Amin"
                YellowText="Seputih Banyak - Lampung Tengah"
                deskripsi="Halaman resmi pengisian formulir pendaftaran santri baru Pondok Pesantren Muhammadiyah Al-Amin Seputih Banyak. Isi data lengkap dan submit online."
              />
            )}

            <div
              className={clsx(
                "w-full flex flex-col justify-start items-start px-4 py-14 min-h-screen lg:py-16",
                admin && "py-12",
              )}
            >
              {/* header page for mobile*/}
              <div className="w-full flex flex-row justify-start items-start lg:hidden">
                {admin ? (
                  <HeaderDashboard
                    title="Edit Data Calon Santri"
                    subTitle="Silahkan ubah sesuai dengan identitas calon santri"
                    tanggal={true}
                  />
                ) : (
                  <SubJudulLeft title="Formulir Pendaftaran " />
                )}
              </div>

              {/* header page for desktop */}
              <div className="w-full flex-row justify-start items-start hidden lg:flex lg:px-4">
                <SubJudulCenter title="Formulir Pendaftaran " />
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col justify-start items-start mt-12 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-4"
              >
                {/* choose jenis sekolah */}
                <BoxInputChoose<CreateStudentType | UpdateStudentType>
                  label="Jenis Sekolah"
                  chooseList={jenisSekolahList}
                  required
                  controller={fieldsController.jenisSekolah}
                  defaultValue={
                    dataStudent?.success ? dataStudent?.data.jenis_sekolah : ""
                  }
                  placeholder="Pilih Jenis Sekolah"
                  hAuto={true}
                  scrollHide={true}
                />

                {/* nik */}
                <BoxInputText
                  register={register("nik")}
                  label="NIK"
                  name="nik"
                  placeholder="Masukkan NIK ..."
                  required
                  errorMessage={errors.nik?.message}
                  max={16}
                  numeric={true}
                />

                {/* nisn */}
                <BoxInputText
                  register={register("nisn")}
                  label="NISN"
                  name="nisn"
                  placeholder="Masukkan NISN ..."
                  required
                  errorMessage={errors.nisn?.message}
                  max={10}
                  numeric={true}
                />

                {/* nama lengkap */}
                <BoxInputText
                  register={register("nama_lengkap")}
                  label="Nama Lengkap"
                  name="nama_lengkap"
                  placeholder="Masukkan Nama Lengkap ..."
                  required
                  errorMessage={errors.nama_lengkap?.message}
                  max={50}
                />

                {/* choose jenis kelamin */}
                <BoxInputChoose<CreateStudentType | UpdateStudentType>
                  label="Jenis Kelamin"
                  chooseList={["laki_laki", "perempuan"]}
                  required
                  controller={fieldsController.jenisKelamin}
                  defaultValue={
                    dataStudent?.success ? dataStudent?.data.jenis_kelamin : ""
                  }
                  placeholder="Pilih Jenis Kelamin"
                  hAuto={true}
                  scrollHide={true}
                />

                {/* usia */}
                <BoxInputNumber
                  register={register("usia")}
                  label="Usia"
                  name="usia"
                  placeholder="Masukkan usia ..."
                  required
                  errorMessage={errors.usia?.message}
                  max={20}
                />

                {/* tempat lahir */}
                <BoxInputText
                  register={register("tempat_lahir")}
                  label="Tempat Lahir"
                  name="tempat_lahir"
                  placeholder="Masukkan Tempat Lahir ..."
                  required
                  errorMessage={errors.tempat_lahir?.message}
                  max={100}
                />

                {/* tanggal lahir */}
                <BoxInputDate<CreateUstadType | UpdateStudentType>
                  controller={fieldsController.tanggalLahir}
                  label="Tanggal Lahir"
                  required={true}
                  oldValue={
                    dataStudent?.success
                      ? new Date(dataStudent?.data?.tanggal_lahir)
                      : undefined
                  }
                />

                {/* alamat */}
                <BoxInputText
                  register={register("alamat")}
                  label="Alamat"
                  name="alamat"
                  placeholder="Masukkan Alamat ..."
                  required
                  errorMessage={errors.alamat?.message}
                  max={150}
                />

                {/* anak ke */}
                <BoxInputNumber
                  register={register("anak_ke")}
                  label="Anak Ke"
                  name="anak_ke"
                  placeholder="Masukkan anak ke ..."
                  required
                  errorMessage={errors.anak_ke?.message}
                  max={20}
                />

                {/* jumlah saudara */}
                <BoxInputNumber
                  register={register("jumlah_saudara")}
                  label="Jumlah Saudara"
                  name="jumlah_saudara"
                  placeholder="Masukkan jumlah saudara ..."
                  required
                  errorMessage={errors.jumlah_saudara?.message}
                  max={20}
                />

                {/* asal sekolah */}
                <BoxInputText
                  register={register("asal_sekolah")}
                  label="Asal Sekolah"
                  name="asal_sekolah"
                  placeholder="Masukkan Asal Sekolah ..."
                  required
                  errorMessage={errors.asal_sekolah?.message}
                  max={150}
                />

                {/* alamat sekolah asal */}
                <BoxInputText
                  register={register("alamat_sekolah_asal")}
                  label="Alamat Sekolah Asal"
                  name="alamat_sekolah_asal"
                  placeholder="Masukkan Alamat Sekolah Asal ..."
                  required
                  errorMessage={errors.alamat_sekolah_asal?.message}
                  max={150}
                />

                {/* nama lengkap ayah*/}
                <BoxInputText
                  register={register("nama_lengkap_ayah")}
                  label="Nama Lengkap Ayah"
                  name="nama_lengkap_ayah"
                  placeholder="Masukkan Nama Lengkap Ayah ..."
                  required
                  errorMessage={errors.nama_lengkap_ayah?.message}
                  max={50}
                />

                {/* nama lengkap ibu*/}
                <BoxInputText
                  register={register("nama_lengkap_ibu")}
                  label="Nama Lengkap Ibu"
                  name="nama_lengkap_ibu"
                  placeholder="Masukkan Nama Lengkap Ibu ..."
                  required
                  errorMessage={errors.nama_lengkap_ibu?.message}
                  max={50}
                />

                {/* nama lengkap wali*/}
                <BoxInputText
                  register={register("nama_lengkap_wali")}
                  label="Nama Lengkap Wali (Optional)"
                  name="nama_lengkap_wali"
                  placeholder="Masukkan Nama Lengkap Wali ..."
                  errorMessage={errors.nama_lengkap_wali?.message}
                  max={50}
                />

                {/* nik */}
                <BoxInputText
                  register={register("no_telepon")}
                  label="No Telepon / Whatsapp"
                  name="no_telepon"
                  placeholder="Masukkan No Telepon ..."
                  required
                  errorMessage={errors.no_telepon?.message}
                  max={14}
                  numeric={true}
                />

                {/* space */}
                <div className="w-full hidden lg:flex" />

                {imageFields.map((item) => (
                  <BoxInputGambar<CreateStudentType | UpdateStudentType>
                    key={item.key}
                    label={item.label}
                    controller={
                      fieldsController[
                        item.key === "foto_formal"
                          ? "fotoFormal"
                          : item.key === "fc_kis_kip"
                            ? "fcKis"
                            : item.key === "fc_akta_kelahiran"
                              ? "fcAkta"
                              : item.key === "fc_ktp"
                                ? "fcKtp"
                                : "fotoKK"
                      ]
                    }
                    required={false}
                    formulirPendaftaran={true}
                    clearError={() => clearErrors(item.key)}
                  />
                ))}

                {/* space */}
                <div className="w-full hidden lg:flex" />

                {/* button submit */}
                <div
                  className={clsx(
                    "w-full mt-6 flex flex-row justify-start items-center lg:col-span-3",
                    admin && "gap-4",
                  )}
                >
                  {/* button back */}
                  {admin && <ButtonBack link="/dashboard/calon-santri" />}

                  {/* space */}
                  <div className="w-full hidden lg:flex" />

                  <ButtonSubmit label="Submit" loading={isPending} />

                  {/* space */}
                  <div className="w-full hidden lg:flex" />
                </div>
              </form>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default FormulirPendaftaranPage;
