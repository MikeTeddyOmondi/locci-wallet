import { z } from "zod"

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export type LoginType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
    .object({
        email: z.string().email(),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" }),
        confirmPassword: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export type RegisterType = z.infer<typeof RegisterSchema>;