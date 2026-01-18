import z, { ZodType } from "zod";
import type {
  CreateFasilitasType,
  UpdateFasilitasType,
} from "../models/fasilitas-model";

// max file size 2 MB
const MAX_FILE_SIZE = 2 * 1024 * 1024;

// type
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export class FasilitasValidation {
  // CREATE – semua field wajib (tanpa _id & images)
  static readonly CREATE = z
    .object({
      fasilitas: z
        .string()
        .min(3, { message: "nama fasilitas minimal 3 karakter" })
        .max(50, { message: "nama fasilitas maksimal 50 karakter" }),

      keterangan: z
        .string()
        .min(5, { message: "keterangan minimal 5 karakter" })
        .max(70, { message: "keterangan maksimal 70 karakter" }),

      images: z
        .instanceof(File, { message: "File harus diisi" })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: "Maksimal ukuran file 2 MB",
        })
        .refine((file) => ACCEPTED_TYPES.includes(file.type), {
          message: "Format file tidak valid",
        }),
    })
    .strict() satisfies ZodType<CreateFasilitasType>;

  // UPDATE – semua field optional
  static readonly UPDATE = z
    .object({
      fasilitas: z
        .string()
        .min(3, { message: "nama fasilitas minimal 3 karakter" })
        .max(50, { message: "nama fasilitas maksimal 50 karakter" })
        .optional(),

      keterangan: z
        .string()
        .min(5, { message: "keterangan minimal 5 karakter" })
        .max(70, { message: "keterangan maksimal 70 karakter" })
        .optional(),

      images: z
        .instanceof(File, { message: "File harus diisi" })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: "Maksimal ukuran file 2 MB",
        })
        .refine((file) => ACCEPTED_TYPES.includes(file.type), {
          message: "Format file tidak valid",
        })
        .optional(),
    })
    .strict() satisfies ZodType<UpdateFasilitasType>;
}
