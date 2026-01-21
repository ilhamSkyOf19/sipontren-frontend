import z, { ZodType } from "zod";
import type { UpdateJumlahAlumniType } from "../models/jumlahAlumni";

export class JumlahAlumniValidation {
  // number schema
  static numberSchema(label: string, min: number, max: number) {
    return z
      .string()
      .optional()
      .refine(
        (val) => {
          // boleh kosong (untuk update)
          if (!val) return true;

          // hanya angka (tanpa minus, tanpa huruf)
          if (!/^\d+$/.test(val)) return false;

          const num = Number(val);
          return num >= min && num <= max;
        },
        {
          message: `${label} harus berupa angka antara ${min} - ${max}`,
        },
      );
  }

  // update
  static readonly UPDATE = z
    .object({
      laki_laki: this.numberSchema("Laki-laki", 0, 99999).optional(),
      perempuan: this.numberSchema("Perempuan", 0, 99999).optional(),
    })
    .partial()
    .strict() satisfies ZodType<Omit<UpdateJumlahAlumniType, "id">>;
}
