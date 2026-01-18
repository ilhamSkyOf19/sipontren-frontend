import z, { ZodType } from "zod";
import type { CreateNewsType, UpdateNewsType } from "../models/news-model";

// max file size 2 MB
const MAX_FILE_SIZE = 2 * 1024 * 1024;

// type
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

// helper sederhana
const minWords = (n: number) => (val: string) =>
  val.trim().split(/\s+/).length >= n;

export class NewsValidation {
  private static titleSchema = z
    .string("title harus diisi")
    .trim()
    .min(5, { message: "title minimal 5 karakter" })
    .max(100, { message: "title maksimal 100 karakter" })
    .refine(minWords(2), {
      message: "title minimal terdiri dari 2 kata",
    });

  private static contentSchema = z
    .string("content harus diisi")
    .trim()
    .min(20, { message: "content minimal 20 karakter" })
    .max(2500, { message: "content maksimal 2500 karakter" })
    .refine(minWords(5), {
      message: "content minimal terdiri dari 5 kata",
    });

  private static categorySchema = z.enum(
    ["berita", "artikel"],
    "category harus diisi",
  );

  private static thumbnailSchema = z
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
      title: this.titleSchema,
      content: this.contentSchema,
      category: this.categorySchema,
      thumbnail: this.thumbnailSchema,
    })
    .strict() satisfies ZodType<CreateNewsType>;

  // UPDATE
  static readonly UPDATE = z
    .object({
      title: this.titleSchema.optional(),
      content: this.contentSchema.optional(),
      category: this.categorySchema.optional(),
      thumbnail: this.thumbnailSchema.optional(),
    })
    .strict() satisfies ZodType<UpdateNewsType>;
}
