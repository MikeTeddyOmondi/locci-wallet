"use client";

import { createWallet } from "@/services/intasend";
import {
	CreateWalletFormschema,
	WalletFormDetails,
} from "@/services/intasend/config";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Box,
	Button,
	Checkbox,
	Paper,
	Select,
	Space,
	Text,
	TextInput,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useForm } from "react-hook-form";
import { customRandom, random, urlAlphabet } from "nanoid";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export const CreateWalletForm = () => {
	const router = useRouter();
	
	const {
		register,
		handleSubmit,
		formState: { errors, isLoading },
	} = useForm<WalletFormDetails>({
		resolver: zodResolver(CreateWalletFormschema),
		defaultValues: {
			can_disburse: true,
			currency: "KES",
			label: `locci-${customRandom(urlAlphabet, 6, random)()}`,
			wallet_type: "WORKING",
		},
	});

	const onSubmit = (data: WalletFormDetails) => {
		modals.openConfirmModal({
			title: "Confirm wallet creation",
			children: <Text size="sm">{data.label}</Text>,
			labels: { confirm: "Confirm", cancel: "Cancel" },
			onConfirm: async () => {
				console.log("Confirmed");
				const actionResult = await createWallet(data);
				if (actionResult.success) {
					notifications.show({
						message: `Wallet ${actionResult.data?.wallet.walletId} created!`,
					});
					setTimeout(()=>{
						router.push("/dashboard/wallets")
					}, 3000)
				} else {
					notifications.show({
						color: "red",
						title: "Error creating wallet",
						message: actionResult.errors,
					});
				}
			},
		});
	};

	return (
		<Paper withBorder shadow="md" p="md" w="400px">
			<Box<"form">>
				<Text<"h2"> component="h2" fw="bold" fz="lg">
					Wallet Details
				</Text>
				<TextInput
					label="Label"
					error={errors.label?.message}
					// value={uniqueLabel}
					// defaultValue={uniqueLabel}
					disabled
					{...register("label")}
				/>
				<Space h="sm" />
				{/* <Select
					label="Currency"
					placeholder="Choose currency"
					// data={["KES", "USD", "GBP", "EUR"]}
					data={["KES"]}
				/> */}
				<TextInput
					label="Currency"
					error={errors.currency?.message}
					// value={"KES"}
					// defaultValue={"KES"}
					disabled
					{...register("currency")}
				/>
				<Space h="sm" />
				{/* <Select
					label="Wallet Type"
					placeholder="Choose wallet type"
					data={["WORKING"]}
				/> */}
				<TextInput
					label="Wallet Type"
					error={errors.wallet_type?.message}
					// value={"WORKING"}
					// defaultValue={"WORKING"}
					disabled
					{...register("wallet_type")}
				/>
				<Space h="sm" />
				<Checkbox
					label="Can Disburse"
					error={errors.can_disburse?.message}
					checked
					disabled
					{...register("can_disburse")}
				/>
				<Space h="sm" />
				<Text component="p" c="gray" size="sm">
					When checked you will be able to withdraw from this wallet.
				</Text>
				<Space h="md" />
				<Button disabled={isLoading} onClick={handleSubmit(onSubmit)}>
					Create
				</Button>
			</Box>
		</Paper>
	);
};
