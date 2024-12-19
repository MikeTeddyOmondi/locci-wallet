import IntaSend from 'intasend-node';
import { z } from 'zod';

export const intasend = new IntaSend(
    process.env.INTASEND_PUBLIC_KEY,
    process.env.INTASEND_SECRET_KEY,
    true, // Test ? Set true for test environment
);

export const CreateWalletFormschema = z.object({
    currency: z.enum(["KES", "USD", "GBP", "EUR"]),
    can_disburse: z.boolean().default(false),
    label: z.string().min(8, "Label is not valid"),
    wallet_type: z.enum(["WORKING", "SETTLEMENT"]),
});

export type WalletFormDetails = z.infer<typeof CreateWalletFormschema>;

export const FundWalletPayloadSchema = z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().email("Email is invalid"),
    host: z.string().optional(),
    amount: z.number().min(10, "Amount is below minimum required"),
    currency: z.string().optional(),
    api_ref: z.string().optional(),
    redirect_url: z.string().optional(),
    wallet_id: z.string({ message: "Wallet ID is invalid" }),
})

export type FundWalletPayload = z.infer<typeof FundWalletPayloadSchema>
