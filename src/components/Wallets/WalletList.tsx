"use client";

import { Wallet } from "@/database/schemas";
import { fundWalletCheckout } from "@/services/intasend";
import {
	FundWalletPayload,
	FundWalletPayloadSchema,
} from "@/services/intasend/config";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Box,
	Button,
	Menu,
	Paper,
	Space,
	Text,
	TextInput,
	Title,
	NumberInput,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
	type MRT_ColumnDef,
	MantineReactTable,
	useMantineReactTable,
} from "mantine-react-table";
// import { customRandom, urlAlphabet, random } from "nanoid";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import QRCode from "react-qr-code";

interface WalletListProps {
	wallets: Omit<Wallet, "userId">[];
}

export const WalletList = ({ wallets }: WalletListProps) => {
	const router = useRouter();
	//should be memoized or stable
	const columns = useMemo<MRT_ColumnDef<Omit<Wallet, "userId">>[]>(
		() => [
			{ accessorKey: "id", header: "ID" },
			{ accessorKey: "walletId", header: "Wallet ID" },
			{ accessorKey: "label", header: "Wallet Label" },
		],
		[]
	);

	const {
		register,
		handleSubmit,
		formState: { errors, isLoading },
		watch,
		setValue,
	} = useForm<FundWalletPayload>({
		resolver: zodResolver(FundWalletPayloadSchema),
		defaultValues: {},
	});

	const onSubmit = async (data: FundWalletPayload) => {
		console.log("Checkout...");
		console.log({ data });
		let checkoutResult = await fundWalletCheckout(data);
		console.log({ checkoutResult });
		modals.closeAll();
		modals.open({
			title: "Fund Wallet - Checkout",
			children: (
				<center>
					<QRCode value={checkoutResult.data?.checkout?.url} />
					<Space h="sm" />
					<Button
						component="a"
						fullWidth
						href={checkoutResult.data?.checkout?.url}
						// onClick={(event) => event.preventDefault()}
						target="_blank"
					>
						Checkout Link
					</Button>
				</center>
			),
		});
	};

	function fundCheckout() {
		modals.open({
			title: "Fund Wallet - Checkout",
			children: (
				<Box<"form">>
					{/* <TextInput
						label="First Name"
						error={errors.first_name?.message}
						disabled
						{...register("first_name")}
					/>
					<Space h="sm" /> */}
					{/* <TextInput
						label="Last Name"
						error={errors.last_name?.message}
						disabled
						{...register("last_name")}
					/>
					<Space h="sm" /> */}
					<TextInput
						label="Email"
						error={errors.email?.message}
						{...register("email")}
					/>
					<Space h="sm" />
					{/* <NumberInput
						label="Amount"
						error={errors.amount?.message}
						{...register("amount")}
					/> */}
					<NumberInput
						label="Amount"
						value={watch("amount")} // Use watch to bind the value
						onChange={(value) => setValue("amount", Number(value) || 0)} // Update form value
						error={errors.amount?.message}
					/>
					<Space h="sm" />
					<TextInput
						label="Wallet ID"
						error={errors.wallet_id?.message}
						{...register("wallet_id")}
					/>
					<Space h="md" />
					<Button
						fullWidth
						disabled={isLoading}
						loading={isLoading}
						onClick={handleSubmit(onSubmit)}
					>
						Checkout
					</Button>
				</Box>
			),
		});
	}

	const table = useMantineReactTable({
		columns,
		data: wallets,
		enableRowActions: true,
		positionActionsColumn: "last",
		renderRowActionMenuItems: ({ row }) => (
			<>
				<Menu.Item
					onClick={async (event) => {
						event.stopPropagation();
						console.info("Card Funding");
						fundCheckout();
					}}
				>
					Fund with Card
				</Menu.Item>
				<Menu.Item disabled onClick={() => console.info("M-Pesa Funding")}>
					Fund with M-Pesa
				</Menu.Item>
				<Menu.Item
					disabled
					onClick={() => console.info("Internal Wallet Transfers")}
				>
					Internal Wallet Transfers
				</Menu.Item>
			</>
		),
	});

	return (
		<Paper withBorder radius="md" p="md">
			<Title order={5}>All Wallets</Title>
			<Space h="md" />
			{/* <MantineReactTable
				columns={columns}
				data={wallets}
				mantinePaperProps={{ shadow: "0", withBorder: false }}
			/>			 */}
			<MantineReactTable table={table} />
		</Paper>
	);
};
