"use client";

import {
  Anchor,
  Button,
  Card,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
  Text
} from "@mantine/core";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  return (
		<Card withBorder shadow="md" p={30} mt={30} radius="md">
			<TextInput label="Email" placeholder="cee@gmail.com" required />
			<PasswordInput
				label="Password"
				placeholder="Your password"
				required
				mt="md"
			/>
			<Group mt="md" justify="space-between">
				<Checkbox label="Remember me" />
				<Anchor size="sm" href="#">
					Forgot Password？
				</Anchor>
			</Group>
			<Button fullWidth mt="xl" onClick={() => router.push("/dashboard")}>
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
