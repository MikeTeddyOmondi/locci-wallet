import { PageContainer } from "@/components/PageContainer/PageContainer";
import { WalletList } from "@/components/Wallets/WalletList";

export default function WalletsPage() {
  return (
		<PageContainer title="Wallets">
			<WalletList />
		</PageContainer>
	);
}
