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


