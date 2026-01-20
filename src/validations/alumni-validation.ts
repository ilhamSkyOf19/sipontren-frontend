import z, { ZodType } from "zod";
import type {
  CreateAlumniType,
  UpdateAlumniType,
} from "../models/alumni-model";

// max file size 2 MB
const MAX_FILE_SIZE = 2 * 1024 * 1024;

// type
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export class AlumniValidation {
  private static onlyStringSchema = (msg: string, max: number = 50) =>
    z
      .string(`${msg} harus diisi`)
      .trim()
      .min(1, `${msg} harus diisi`)
      .max(max, `${msg} Maksimal ${max} karakter`)
      .regex(/^[a-zA-Z\s'.-]+$/, `${msg} hanya boleh berisi huruf`);

  static readonly CREATE = z
    .object({
      name: this.onlyStringSchema("Nama", 50),

      angkatan: z
        .string("Angkatan harus diisi")
        .trim()
        .min(2, { message: "Angkatan minimal 2 karakter" })
        .max(20, { message: "Angkatan maksimal 20 karakter" })
        .regex(/^[0-9A-Za-z\s/-]+$/, {
          message: "Format angkatan tidak valid",
        }),

      description: z
        .string()
        .trim()
        .min(10, { message: "Deskripsi minimal 10 karakter" })
        // disesuaikan dengan @db.Text (~65rb karakter)
        .max(250, {
          message: "Deskripsi terlalu panjang ",
        }),

      img_alumni: z
        .instanceof(File, { message: "File harus diisi" })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: "Maksimal ukuran file 2 MB",
        })
        .refine((file) => ACCEPTED_TYPES.includes(file.type), {
          message: "Format file tidak valid",
        }),
    })
    .strict() satisfies ZodType<CreateAlumniType>;

  static readonly UPDATE = z
    .object({
      name: z
        .string()
        .trim()
        .min(3, { message: "Nama minimal 3 karakter" })
        .max(50, { message: "Nama maksimal 50 karakter" })
        .regex(/^[a-zA-Z\s'.-]+$/, {
          message: "Nama hanya boleh berisi huruf dan tanda umum ( ' . - )",
        })
        .optional(),

      angkatan: z
        .string()
        .trim()
        .min(2, { message: "Angkatan minimal 2 karakter" })
        .max(20, { message: "Angkatan maksimal 20 karakter" })
        .regex(/^[0-9A-Za-z\s/-]+$/, {
          message: "Format angkatan tidak valid",
        })
        .optional(),

      description: z
        .string()
        .trim()
        .min(10, { message: "Deskripsi minimal 10 karakter" })
        .max(250, {
          message: "Deskripsi terlalu panjang",
        })
        .optional(),

      img_alumni: z
        .instanceof(File, { message: "File harus diisi" })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: "Maksimal ukuran file 2 MB",
        })
        .refine((file) => ACCEPTED_TYPES.includes(file.type), {
          message: "Format file tidak valid",
        })
        .optional(),
    })
    .strict() satisfies ZodType<Omit<UpdateAlumniType, "id">>;
}
