import { eq } from "drizzle-orm"
import jwt from "jsonwebtoken"
import { db } from "@/database"
import { newsletter } from "@/database/schemas"
import { NextResponse } from "next/server"

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ token: string }> }
) {
    try {
        const token = (await params).token

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET!) as { email: string }

        await db.update(newsletter).set({ verified: true }).where(eq(newsletter.email, decodeToken.email))

        return NextResponse.redirect("http://localhost:3000/?newsletter-subscription=true")
    } catch (error: any) {
        console.log({ confirmNewsletterErr: error })
        return Response.json({ message: 'Something went wrong!' }, {
            status: 500,
            headers: { contentType: "application/json" },
        })
    }
}