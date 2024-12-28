import { relations } from "drizzle-orm";
import {
    timestamp,
    text,
    integer,
    pgTable,
    varchar,
    boolean,
    uniqueIndex
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"

export const users = pgTable("users", {
    id: text("id").notNull().primaryKey().unique().$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    password: text("password"),
}, (table) => {
    return [{
        emailIdx: uniqueIndex("user_email_idx").on(table.email)
    }];
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
    id: text("id").notNull().primaryKey().unique().$defaultFn(() => crypto.randomUUID()),
    walletId: varchar("wallet_id").notNull(),
    label: varchar("label").notNull(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
}, (table) => {
    return [{
        walletIdx: uniqueIndex("wallet_id_idx").on(table.walletId),
        labelIdx: uniqueIndex("label_idx").on(table.walletId),
    }];
});

export const walletsRelations = relations(wallets, ({ one }) => ({
    owner: one(users, {
        fields: [wallets.userId],
        references: [users.id],
    }),
}))

export type Wallet = typeof wallets.$inferSelect;

export const newsletter = pgTable("newsletter", {
    id: text("id").notNull().primaryKey().unique().$defaultFn(() => crypto.randomUUID()),
    name: varchar("name"),
    email: varchar("email").unique().notNull(),
    verified: boolean("verified").$default(() => false)
}, (table) => {
    return [{
        emailIdx: uniqueIndex("email_idx").on(table.email),
    }];
});

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