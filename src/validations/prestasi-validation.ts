import z, { ZodType } from "zod";
import type {
  CreatePrestasiType,
  UpdatePrestasiType,
} from "../models/prestasi-model";

// max file size 2 MB
const MAX_FILE_SIZE = 2 * 1024 * 1024;

// type
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export class PrestasiValidation {
  private static namaSchema = z
    .string("Nama harus diisi")
    .trim()
    .min(3, { message: "Nama minimal 3 karakter" })
    .max(100, { message: "Nama maksimal 100 karakter" })
    .regex(/^[a-zA-Z\s'.-]+$/, {
      message: "Nama hanya boleh berisi huruf dan tanda umum ( ' . - )",
    });

  private static prestasiSchema = z
    .string()
    .trim()
    .min(5, "Prestasi minimal 5 karakter")
    .max(500, "Prestasi terlalu panjang");

  private static imgSchema = z
    .instanceof(File, { message: "File harus diisi" })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Maksimal ukuran file 2 MB",
    })
    .refine((file) => ACCEPTED_TYPES.includes(file.type), {
      message: "Format file tidak valid",
    });

  // CREATE
  static readonly CREATE = z
    .object({
      category_prestasi: z.enum([
        "internasional",
        "nasional",
        "provinsi",
        "kabupaten",
        "kecamatan",
      ]),
      nama: this.namaSchema,
      tahun_prestasi: z.number().int().min(1900),
      prestasi: this.prestasiSchema,
      jenis_kelamin: z.enum(["laki_laki", "perempuan"]),
      photo: this.imgSchema,
    })
    .strict() satisfies ZodType<CreatePrestasiType>;

  // UPDATE
  static readonly UPDATE = z
    .object({
      category_prestasi: z
        .enum([
          "internasional",
          "nasional",
          "provinsi",
          "kabupaten",
          "kecamatan",
        ])
        .optional(),
      nama: this.namaSchema.optional(),
      tahun_prestasi: z.number().int().optional(),
      prestasi: this.prestasiSchema.optional(),
      jenis_kelamin: z.enum(["laki_laki", "perempuan"]).optional(),
      photo: this.imgSchema.optional(),
    })
    .strict() satisfies ZodType<Omit<UpdatePrestasiType, "id">>;
}
