"use client";

import { loginAction } from "@/services/auth/actions";
import {
	LoginSchema,
	LoginType,
} from "@/services/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Anchor,
	Button,
	Card,
	Checkbox,
	Group,
	PasswordInput,
	TextInput,
	Text,
} from "@mantine/core";
// import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function LoginForm() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginType>({
		resolver: zodResolver(LoginSchema),
	});

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof LoginSchema>) {
		const res = await loginAction(data);

		if (res.success) {
			router.push("/dashboard");
		} else {
			notifications.show({
				color: "red",
				title: "Login Error",
				message: res.message,
			});
		}
	}

	return (
		<Card withBorder shadow="md" p={30} mt={30} radius="md">
			<TextInput
				label="Email"
				placeholder="cee@gmail.com"
				required
				{...register("email")}
				error={errors.email?.message}
			/>
			<PasswordInput
				label="Password"
				placeholder="Your password"
				required
				mt="md"
				{...register("password")}
				error={errors.password?.message}
			/>
			<Group mt="md" justify="space-between">
				<Checkbox label="Remember me" />
				<Anchor size="sm" href="/forgot-password">
					Forgot Password？
				</Anchor>
			</Group>
			<Button fullWidth mt="xl" onClick={handleSubmit(onSubmit)}>
				Sign In
			</Button>
			<Text c="dimmed" size="sm" mt={5}>
				Don&apos;t have an account?{" "}
				<Anchor size="sm" href="/register">
					Sign Up
				</Anchor>
			</Text>
		</Card>
	);
}
