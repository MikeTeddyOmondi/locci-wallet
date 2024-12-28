'use server'

import jwt from "jsonwebtoken";
import { db } from "@/database";
import { newsletter } from "@/database/schemas";
import { resend } from "@/services/email/config";
import { ConfirmNewsletterTemplate } from "@/components/Email/confirm-newsletter";
import { eq } from "drizzle-orm";

export async function subscribeNewsletter(data: { email: string }) {
    try {
        const token = jwt.sign({ email: data.email }, process.env.JWT_SECRET!, { expiresIn: '15m' })
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/confirm-newsletter/${token}`

        let [emailFound] = await db.select().from(newsletter).where(eq(newsletter.email, data.email))

        if (emailFound) {
            return {
                success: false,
                message: "Email already subscribed",
                data: "Duplicate subscriptions",
            };
        }

        await db.insert(newsletter).values({ email: data.email })

        // send confirmation email
        const { data: resendEmailData, error: resendErr } = await resend.emails.send({
            from: 'Locci Wallet <locci-wallet@miketeddyomondi.dev>',
            to: [`${data.email}`],
            subject: 'Confirm Newsletter Subscription | Locci Wallet',
            react: ConfirmNewsletterTemplate({ url }),
        });

        if (resendErr) {
            throw resendErr
        }

        return {
            success: true,
            message: "Subscribe to newsletter successfully",
            data: resendEmailData,
        };
    } catch (error: any) {
        console.log({ subscribeNewsletterErr: error });
        return {
            success: false,
            errors: error.message,
        };
    }
}