import z, { ZodType } from "zod";
import type { LoginType } from "../models/user-model";

export class UserValidation {
  // login
  static readonly LOGIN = z
    .object({
      email: z
        .email("email harus diisi")
        .min(5, "email atau password salah")
        .max(50, "email atau password salah"),

      password: z
        .string("password harus diisi")
        .min(8, "email atau password salah")
        .max(100, "email atau password salah")
        .regex(/[A-Z]/, "email atau password salah")
        .regex(/[a-z]/, "email atau password salah")
        .regex(/[0-9]/, "email atau password salah")
        .regex(/[^A-Za-z0-9]/, "email atau password salah"),
    })
    .strict() satisfies ZodType<LoginType>;
}
