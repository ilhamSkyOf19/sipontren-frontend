import z, { ZodType } from "zod";
import type {
  CreateBannerType,
  UpdateBannerType,
} from "../models/banner-model";

// max file size 2 MB
const MAX_FILE_SIZE = 2 * 1024 * 1024;

// type
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export class BannerValidation {
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
      img: this.imgSchema,
    })
    .strict() satisfies ZodType<CreateBannerType>;

  // UPDATE
  static readonly UPDATE = z
    .object({
      img: this.imgSchema.optional(),
    })
    .strict() satisfies ZodType<Omit<UpdateBannerType, "id">>;
}
