"use server";

import { db } from "@/database";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/services/auth";
import { users, wallets } from "@/database/schemas";
import { FundWalletPayload, WalletFormDetails, Transaction, WalletTransactions } from "@/services/intasend/schema";
import { intasend } from "@/services/intasend/config";

export async function createWallet(details: WalletFormDetails) {
  try {
    const session = await auth();
    if (!session) return redirect("/login");

    const walletsApi = intasend.wallets();
    let wallet = await walletsApi.create(details);

    let [queryResult] = await db
      .insert(wallets)
      .values({
        id: uuid(),
        label: wallet.label,
        walletId: wallet.wallet_id,
        userId: session?.user?.id!,
      })
      .returning();

    revalidatePath("/dashboard/wallets")

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
    if (!session) return redirect("/login");

    const walletsApi = intasend.wallets();
    let walletTransactions: WalletTransactions = await walletsApi.transactions(walletId);

    function filterTransactionsWithInvoices(transactions: WalletTransactions): Transaction[] {
      return transactions.results.filter(transaction => transaction.invoice !== null);
    }

    const filteredTransactions = filterTransactionsWithInvoices(walletTransactions);

    return {
      success: true,
      message: "Found wallet transactions",
      data: filteredTransactions,
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
    if (!session) return redirect("/login");

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

export async function fundWalletCheckout(payload: FundWalletPayload) {
  try {
    const session = await auth();
    if (!session) return redirect("/login");

    const walletsApi = intasend.wallets();
    let checkout = await walletsApi.fundCheckout(payload);

    return {
      success: true,
      message: "Wallet checkout successful",
      data: { checkout },
    };
  } catch (error: any) {
    // const apiErr = JSON.parse(error);
    // console.log({ createWalletErr: apiErr }); // apiErr.errors[0].detail
    console.log({ fundWalletCheckoutErr: error });
    return {
      success: false,
      errors: error.message,
    };
  }
}

export async function getDashboardStats() {
  try {
    const session = await auth();
    if (!session) return redirect("/login");

    // fetch no. of wallets & wallets info
    const walletsInfoResult = await listUserWallets(session.user?.id!);

    if (walletsInfoResult.success) {
      const numWallets = walletsInfoResult.data?.userWallets.length || 0;
      
      // Use Promise.all to wait for all wallet transactions to be fetched
      const walletBalances = await Promise.all(
        walletsInfoResult.data?.userWallets.map(async (wallet) => {
          const walletInfo = await listWalletTransactions(wallet.walletId);
          if (walletInfo.success) {
            // Calculate balance for each wallet
            return walletInfo.data?.reduce(
              (acc, wallet) => acc + Number(wallet?.invoice?.net_amount || 0),
              0
            ) || 0;
          }
          return 0;
        }) || []
      );

      // Sum up all wallet balances
      const totalBalance = walletBalances.reduce((acc, balance) => acc + balance, 0).toFixed(2);

      const data = {
        stats: [
          { title: "Number of Wallets", value: String(numWallets) },
          { title: "Total Balance", value: String(totalBalance) },
        ],
      };

      return {
        success: true,
        message: "Dashboard data fetched successful",
        data: { ...data },
      };
    }

  } catch (error: any) {
    console.error({ getDashboardStatsErr: error });
    return {
      success: false,
      errors: error.message,
    };
  }
}