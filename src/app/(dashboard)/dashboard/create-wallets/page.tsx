import { CreateWalletForm } from "@/components/Wallets/CreateWalletForm";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { auth } from "@/services/auth";
import { redirect } from "next/navigation";

export default async function Form() {
	const session = await auth();

	if (!session) {
		redirect("/login");
	}
	
	return (
		<PageContainer title="Create Wallets">
			<CreateWalletForm />
		</PageContainer>
	);
}
