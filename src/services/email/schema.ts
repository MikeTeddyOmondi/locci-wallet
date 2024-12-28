import { z } from "zod"

export const NewsletterSchema = z.object({
    email: z.string().email("Email is invalid"),
})

export type Newsletter = z.infer<typeof NewsletterSchema>