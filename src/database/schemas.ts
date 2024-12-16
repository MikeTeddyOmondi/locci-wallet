import { relations } from "drizzle-orm";
import {
    boolean,
    timestamp,
    text,
    primaryKey,
    integer,
    pgTable, serial, varchar
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"

export const users = pgTable("users", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    password: text("password"),
})

export const usersRelations = relations(users, ({ many }) => ({
    wallets: many(wallets),
}));

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" })
            .primaryKey(),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    }
)

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const wallets = pgTable("wallets", {
    id: serial("id").notNull().primaryKey().unique(),
    walletId: varchar("wallet_id").notNull(),
    label: varchar("label").notNull(),
    userId: serial("user_id").notNull(),
});

export const walletsRelations = relations(wallets, ({ one }) => ({
    owner: one(users, {
        fields: [wallets.userId],
        references: [users.id],
    }),
}))

// export const verificationTokens = pgTable(
//     "verificationToken",
//     {
//         identifier: text("identifier").notNull(),
//         token: text("token").notNull(),
//         expires: timestamp("expires", { mode: "date" }).notNull(),
//     },
//     (verificationToken) => ({
//         compositePk: primaryKey({
//             columns: [verificationToken.identifier, verificationToken.token],
//         }),
//     })
// )

// export const authenticators = pgTable(
//     "authenticator",
//     {
//         credentialID: text("credentialID").notNull().unique(),
//         userId: text("userId")
//             .notNull()
//             .references(() => users.id, { onDelete: "cascade" }),
//         providerAccountId: text("providerAccountId").notNull(),
//         credentialPublicKey: text("credentialPublicKey").notNull(),
//         counter: integer("counter").notNull(),
//         credentialDeviceType: text("credentialDeviceType").notNull(),
//         credentialBackedUp: boolean("credentialBackedUp").notNull(),
//         transports: text("transports"),
//     },
//     (authenticator) => ({
//         compositePK: primaryKey({
//             columns: [authenticator.userId, authenticator.credentialID],
//         }),
//     })
// )