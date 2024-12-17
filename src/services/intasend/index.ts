"use server";

import { db } from "@/database";
import { users, wallets } from "@/database/schemas";
import { auth } from "@/services/auth";
import { WalletFormDetails, intasend } from "@/services/intasend/config";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";

export async function createWallet(details: WalletFormDetails) {
  try {
    const session = await auth();

    if (!session) {
      return redirect("/login");
    }

    const walletsApi = intasend.wallets();
    let wallet = await walletsApi.create(details);
    console.log({ wallet });

    let [queryResult] = await db
      .insert(wallets)
      .values({
        id: uuid(),
        label: wallet.label,
        walletId: wallet.wallet_id,
        userId: session?.user?.id!,
      })
      .returning();
    console.log({ queryResult });

    return {
      success: true,
      message: "Wallet created successfully",
      data: { wallet: queryResult },
    };
  } catch (error: any) {
    const apiErr = JSON.parse(error);
    console.log({ createWalletErr: apiErr }); // apiErr.errors[0].detail
    return {
      success: false,
      errors: `Error: ${apiErr.errors[0].detail}`,
    };
  }
}

export async function listWalletTransactions(walletId: string) {
  try {
    const session = await auth();

    if (!session) {
      return redirect("/login");
    }

    const walletsApi = intasend.wallets();

    let walletTransactions = await walletsApi.transactions(walletId);
    console.log({ walletTransactions });

    return {
      success: true,
      message: "Found wallet transactions",
      data: walletTransactions,
    };
  } catch (error: any) {
    return {
      success: false,
      errors: error.message,
    };
  }
}

export async function listUserWallets(userId: string) {
  try {
    const session = await auth();

    if (!session) {
      return redirect("/login");
    }

    let userWallets = await db
      .select({
        id: wallets.id,
        label: wallets.label,
        walletId: wallets.walletId,
      })
      .from(wallets)
      .innerJoin(users, eq(wallets.userId, (users.id)));

    return {
      success: true,
      message: "Found user wallets",
      data: { userWallets },
    };
  } catch (error: any) {
    return {
      success: false,
      errors: error.message,
    };
  }
}
