import z, { ZodType } from "zod";
import type { CreateUstadType, UpdateUstadType } from "../models/ustad-model";

// max file size 2 MB
const MAX_FILE_SIZE = 2 * 1024 * 1024;

// type
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export class UstadValidation {
  // ================= CREATE =================
  static readonly CREATE = z
    .object({
      name: z
        .string("nama harus diisi")
        .trim()
        .min(3, "nama minimal 3 karakter")
        .max(50, "nama maksimal 50 karakter"),

      jenis_kelamin: z.enum(
        ["laki_laki", "perempuan"],
        "jenis kelamin harus diisi",
      ),

      tempat_lahir: z
        .string("tempat lahir harus diisi")
        .trim()
        .min(3, "tempat lahir minimal 3 karakter")
        .max(50, "tempat lahir maksimal 50 karakter"),

      // 👉 sesuai permintaan: STRING BIASA
      tanggal_lahir: z
        .string("tanggal lahir harus diisi")
        .trim()
        .min(4, "tanggal lahir tidak boleh kosong"),

      alamat: z
        .string("alamat harus diisi")
        .trim()
        .min(10, "alamat minimal 10 karakter agar lebih lengkap")
        .max(100, "alamat maksimal 100 karakter"),

      no_telepon: z
        .string("nomor telepon harus diisi")
        .trim()
        .regex(/^[0-9]+$/, "nomor telepon hanya boleh berisi angka")
        .min(10, "nomor telepon minimal 10 digit")
        .max(14, "nomor telepon maksimal 14 digit"),

      jabatan: z
        .string("jabatan harus diisi")
        .trim()
        .min(3, "jabatan minimal 3 karakter")
        .max(50, "jabatan maksimal 50 karakter"),

      ustad_img: z
        .instanceof(File, { message: "File harus diisi" })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: "Maksimal ukuran file 2 MB",
        })
        .refine((file) => ACCEPTED_TYPES.includes(file.type), {
          message: "Format file tidak valid",
        }),
    })
    .strict() satisfies ZodType<CreateUstadType>;

  // ================= UPDATE =================
  static readonly UPDATE = z
    .object({
      name: z
        .string()
        .trim()
        .min(3, "nama minimal 3 karakter")
        .max(50, "nama maksimal 50 karakter")
        .optional(),

      jenis_kelamin: z
        .enum(["laki_laki", "perempuan"], "jenis kelamin harus diisi")
        .optional(),

      tempat_lahir: z
        .string()
        .trim()
        .min(3, "tempat lahir minimal 3 karakter")
        .max(50, "tempat lahir maksimal 50 karakter")
        .optional(),

      // 👉 STRING JUGA DI UPDATE
      tanggal_lahir: z
        .string()
        .trim()
        .min(4, "tanggal lahir tidak boleh kosong")
        .optional(),

      alamat: z
        .string()
        .trim()
        .min(10, "alamat minimal 10 karakter agar lebih lengkap")
        .max(100, "alamat maksimal 100 karakter")
        .optional(),

      no_telepon: z
        .string()
        .trim()
        .regex(/^[0-9]+$/, "nomor telepon hanya boleh berisi angka")
        .min(10, "nomor telepon minimal 10 digit")
        .max(14, "nomor telepon maksimal 14 digit")
        .optional(),

      jabatan: z
        .string()
        .trim()
        .min(3, "jabatan minimal 3 karakter")
        .max(50, "jabatan maksimal 50 karakter")
        .optional(),
      ustad_img: z
        .instanceof(File, { message: "File harus diisi" })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: "Maksimal ukuran file 2 MB",
        })
        .refine((file) => ACCEPTED_TYPES.includes(file.type), {
          message: "Format file tidak valid",
        })
        .optional(),
    })
    .strict() satisfies ZodType<Omit<UpdateUstadType, "id">>;
}
