import { DashboardContent } from "@/components/Dashboard/DashboardContent";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { auth } from "@/services/auth";
import {
	getDashboardStats,
	listUserWallets,
	listWalletTransactions,
} from "@/services/intasend";
import { redirect } from "next/navigation";
import { cache } from "react";

export default async function Dashboard() {
	const session = await auth();

	if (!session) {
		redirect("/login");
	}

	const statsResult = await getDashboardStats();

	return (
		<PageContainer title="Dashboard">
			<DashboardContent data={{ stats: statsResult?.data?.stats! }} />
		</PageContainer>
	);
}
