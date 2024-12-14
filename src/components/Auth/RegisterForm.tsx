"use client";

import { Anchor, Button, Paper, PasswordInput, Space, TextInput, Text } from "@mantine/core";

export function RegisterForm() {
  return (
		<Paper withBorder shadow="md" p={30} mt={30} radius="md">
			<TextInput label="Email" placeholder="cee@gmail.com" required />
			<PasswordInput
				label="Password"
				placeholder="Your password"
				required
				mt="md"
			/>
			<Space h="md" />
			<Button fullWidth mt="xl">
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
