import { v4 as uuid } from "uuid"
import NextAuth, { User } from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { encode as defaultEncode } from 'next-auth/jwt'
import Credentials from "next-auth/providers/credentials"

import { db } from "@/database"
import { getUserFromDb } from "./actions"
import { accounts, sessions, users } from "@/database/schemas"

// TODO: Fix this type error - DrizzleAdapter doesn't export a type that we can use here
const adapter = DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    // authenticatorsTable,
    // verificationTokensTable,
} as any)

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const { email, password } = credentials

                const res = await getUserFromDb(email as string, password as string)
                if (res.success) {
                    return res.data as User
                }

                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account?.provider === "credentials") {
                token.credentials = true
            }
            return token
        },
    },
    jwt: {
        encode: async function (params) {
            if (params.token?.credentials) {
                const sessionToken = uuid()

                if (!params.token.sub) {
                    throw new Error("No user ID found in token")
                }

                const createdSession = await adapter?.createSession?.({
                    sessionToken: sessionToken,
                    userId: params.token.sub,
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                })

                if (!createdSession) {
                    throw new Error("Failed to create session")
                }

                return sessionToken
            }
            return defaultEncode(params)
        },
    },
    secret: process.env.AUTH_SECRET!,
    // session: {
    //     strategy: 'jwt',
    // },
})