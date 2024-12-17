import { PageContainer } from "@/components/PageContainer/PageContainer";
import { WalletList } from "@/components/Wallets/WalletList";
import { auth } from "@/services/auth";
import { listUserWallets } from "@/services/intasend";
import { redirect } from "next/navigation";

export default async function WalletsPage() {
	const session = await auth();

	if (!session) {
		redirect("/login");
	}
	
	const walletsResult = await listUserWallets(session.user?.id!) 
	const wallets = walletsResult.data?.userWallets ?? []
	
	return (
		<PageContainer title="Wallets">
			<WalletList wallets={wallets} />
		</PageContainer>
	);
}
