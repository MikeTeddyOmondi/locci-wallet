"use client";

import { registerAction } from "@/services/auth/actions";
import { RegisterSchema, RegisterType } from "@/services/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Anchor,
	Button,
	Paper,
	PasswordInput,
	Space,
	TextInput,
	Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function RegisterForm() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterType>({
		resolver: zodResolver(RegisterSchema),
	});

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof RegisterSchema>) {
		const res = await registerAction(data);
		console.log({ res });

		if (res.success) {
			router.push("/login");
		} else {
			console.log({ message: res.message });
			notifications.show({
				color: "red",
				title: "Registration Error",
				message: res.message,
			});
		}
	}
	return (
		<Paper withBorder shadow="md" p={30} mt={30} radius="md">
			<TextInput
				label="Email"
				placeholder="user@email.com"
				required
				{...register("email")}
				error={errors.email?.message}
			/>
			<PasswordInput
				label="Password"
				placeholder="Password"
				required
				mt="md"
				{...register("password")}
				error={errors.password?.message}
			/>
			<PasswordInput
				label="Confirm Password"
				placeholder="Confirm password"
				required
				mt="md"
				{...register("confirmPassword")}
				error={errors.confirmPassword?.message}
			/>
			<Space h="md" />
			<Button fullWidth mt="xl" onClick={handleSubmit(onSubmit)}>
				Sign Up
			</Button>
			<Text c="dimmed" size="sm" mt={5}>
				Already have an account?{" "}
				<Anchor size="sm" href="/login">
					Login
				</Anchor>
			</Text>
		</Paper>
	);
}
