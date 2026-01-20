import z, { ZodType } from "zod";
import type {
  CreateStudentType,
  UpdateStudentType,
} from "../models/student-model";

// max file size 2 MB
const MAX_FILE_SIZE = 2 * 1024 * 1024;

// type
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export class StudentValidation {
  // ================= SCHEMA DASAR =================

  private static onlyStringSchema = (msg: string, max: number = 50) =>
    z
      .string(`${msg} harus diisi`)
      .trim()
      .min(1, `${msg} harus diisi`)
      .max(max, `${msg} Maksimal ${max} karakter`)
      .regex(/^[a-zA-Z\s'.-]+$/, `${msg} hanya boleh berisi huruf`);

  private static stringSchema = (msg: string, max: number = 255) =>
    z
      .string(`${msg} harus diisi`)
      .trim()
      .min(1, `${msg} harus diisi`)
      .max(max, `${msg} maksimal ${max} karakter`);

  private static stringNumberSchema = (
    msg: string,
    min: number = 0,
    max: number = 999,
  ) =>
    z
      .string(`${msg} harus diisi`)
      .trim()
      .min(1, `${msg} harus diisi`)
      // hanya angka
      .regex(/^[0-9]+$/, `${msg} hanya boleh berisi angka`)
      // validasi range
      .refine((val) => {
        const num = Number(val);
        return num >= min;
      }, `${msg} minimal ${min}`)
      .refine((val) => {
        const num = Number(val);
        return num <= max;
      }, `${msg} maksimal ${max}`);

  private static digitLengthSchema = (msg: string, length: number) =>
    z
      .string(`${msg} harus diisi`)
      .trim()
      // hanya angka
      .regex(/^[0-9]+$/, `${msg} hanya boleh berisi angka`)
      // wajib panjang tertentu
      .length(length, `${msg} harus ${length} digit`);

  private static enumSekolah = z.enum(
    ["SD", "SMP", "SMA"],
    "Sekolah harus diisi",
  );

  private static enumKelamin = z.enum(
    ["laki_laki", "perempuan"],
    "Jenis kelamin harus diisi",
  );

  private static phoneSchema = z
    .string("Nomor telepon harus diisi")
    .trim()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(14, "Nomor telepon maksimal 15 digit");

  private static dateSchema = z.string("Tanggal lahir harus diisi");

  private static imgSchema = z
    .instanceof(File, { message: "File harus diisi" })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Maksimal ukuran file 2 MB",
    })
    .refine((file) => ACCEPTED_TYPES.includes(file.type), {
      message: "Format file tidak valid",
    });

  // ================= CREATE =================

  static readonly CREATE = z
    .object({
      jenis_sekolah: this.enumSekolah,

      nisn: this.digitLengthSchema("NISN", 10),
      nik: this.digitLengthSchema("NIK", 16),

      nama_lengkap: this.onlyStringSchema("Nama lengkap", 50),

      jenis_kelamin: this.enumKelamin,

      usia: this.stringNumberSchema("Usia", 6, 25),

      tempat_lahir: this.stringSchema("Tempat lahir", 100),

      tanggal_lahir: this.dateSchema,

      alamat: this.stringSchema("Alamat", 150),

      anak_ke: this.stringNumberSchema("Anak ke", 1, 20),

      jumlah_saudara: this.stringNumberSchema("Jumlah saudara", 0, 20),

      asal_sekolah: this.stringSchema("Asal sekolah", 150),

      alamat_sekolah_asal: this.stringSchema("Alamat sekolah asal", 150),

      nama_lengkap_ayah: this.stringSchema("Nama ayah", 100),

      nama_lengkap_ibu: this.stringSchema("Nama ibu", 100),

      nama_lengkap_wali: z
        .string()
        .max(100, "Nama wali maksimal 100 karakter")
        .optional(),

      no_telepon: this.phoneSchema,

      foto_formal: this.imgSchema,
      fc_akta_kelahiran: this.imgSchema,
      foto_kk: this.imgSchema,
      fc_ktp: this.imgSchema,
      fc_kis_kip: this.imgSchema,
    })
    .strict() satisfies ZodType<CreateStudentType>;

  // ================= UPDATE =================

  static readonly UPDATE = z
    .object({
      jenis_sekolah: this.enumSekolah.optional(),

      nisn: this.digitLengthSchema("NISN", 10).optional(),
      nik: this.digitLengthSchema("NIK", 16).optional(),

      nama_lengkap: this.onlyStringSchema("Nama lengkap", 50).optional(),

      jenis_kelamin: this.enumKelamin.optional(),

      usia: this.stringNumberSchema("Usia", 3, 25).optional(),

      tempat_lahir: this.stringSchema("Tempat lahir", 100).optional(),

      tanggal_lahir: this.dateSchema.optional(),

      alamat: this.stringSchema("Alamat", 150).optional(),

      anak_ke: this.stringNumberSchema("Anak ke", 1, 20).optional(),

      jumlah_saudara: this.stringNumberSchema(
        "Jumlah saudara",
        0,
        20,
      ).optional(),

      asal_sekolah: this.stringSchema("Asal sekolah", 150).optional(),

      alamat_sekolah_asal: this.stringSchema(
        "Alamat sekolah asal",
        150,
      ).optional(),

      nama_lengkap_ayah: this.stringSchema("Nama ayah", 100).optional(),

      nama_lengkap_ibu: this.stringSchema("Nama ibu", 100).optional(),

      nama_lengkap_wali: z
        .string()
        .max(100, "Nama wali maksimal 100 karakter")
        .optional(),

      no_telepon: this.phoneSchema.optional(),

      foto_formal: this.imgSchema.optional(),
      fc_akta_kelahiran: this.imgSchema.optional(),
      foto_kk: this.imgSchema.optional(),
      fc_ktp: this.imgSchema.optional(),
      fc_kis_kip: this.imgSchema.optional(),
    })
    .strict() satisfies ZodType<UpdateStudentType>;
}
