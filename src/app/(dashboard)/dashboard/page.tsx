import { DashboardContent } from "@/components/Dashboard/DashboardContent";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { auth } from "@/services/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
	const session = await auth();

	if (!session) {
	  redirect("/login")
	}
  
	return (
		<PageContainer title="Dashboard">
			<DashboardContent />
		</PageContainer>
	);
}
