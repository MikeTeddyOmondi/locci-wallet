"use client";

import { Wallet } from "@/database/schemas";
import { Paper, Space, Title } from "@mantine/core";
import { type MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import { useMemo } from "react";

interface WalletListProps {
	wallets: Omit<Wallet, "userId">[];
}

export const WalletList = ({ wallets }: WalletListProps) => {
	//should be memoized or stable
	const columns = useMemo<MRT_ColumnDef<Omit<Wallet, "userId">>[]>(
		() => [
			{ accessorKey: "id", header: "ID" },
			{ accessorKey: "walletId", header: "Wallet ID" },
			{ accessorKey: "label", header: "Wallet Label" },
		],
		[]
	);

	const data = wallets;

	return (
		<Paper withBorder radius="md" p="md">
			<Title order={5}>All Wallets</Title>
			<Space h="md" />
			<MantineReactTable
				columns={columns}
				data={data}
				mantinePaperProps={{ shadow: "0", withBorder: false }}
			/>
		</Paper>
	);
};
