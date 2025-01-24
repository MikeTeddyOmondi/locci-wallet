"use client";

import { Box, Button, Image, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import classes from "./EmailSection.module.css";
import { Newsletter, NewsletterSchema } from "@/services/email/schema";
import { subscribeNewsletter } from "@/services/email";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";

export function EmailSection() {
	const searchParams = useSearchParams();

	const {
		register,
		handleSubmit,
		formState: { errors, isLoading },
		reset,
	} = useForm<Newsletter>({
		resolver: zodResolver(NewsletterSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (data: Newsletter) => {
		console.log("Newsletter: ", data);
		let subscribeResult = await subscribeNewsletter(data);
		console.log({ subscribeResult });
		if (subscribeResult.success) {
			reset();
			return notifications.show({
				title: "Locci Wallet Newsletter",
				message: "Email sent succesfully",
			});
		}
		return notifications.show({
			color: "red",
			title: "Locci Wallet Newsletter",
			message: subscribeResult.message ?? "Something went wrong!",
		});
	};

	useEffect(() => {
		if (searchParams.get("newsletter-subscription")) {
			notifications.show({
				title: "Locci Wallet Newsletter",
				message:
					"Thanks for subscribing to our newsletter! We will be emailing soon...",
			});
			return;
		}
	}, []);

	return (
		<div className={classes.wrapper}>
			<div className={classes.body}>
				<Title order={3} className={classes.title}>
					Wait a minute...
				</Title>
				<Text fw={500} fz="md" mb={5}>
					Subscribe to our newsletter!
				</Text>
				<Text fz="sm" c="dimmed">
					You will never miss important product updates, latest news and
					community QA sessions. Our newsletter is once a week.
				</Text>

				<Box<"form">>
					<div className={classes.controls}>
						<TextInput
							placeholder="Your email"
							classNames={{
								input: classes.input,
								root: classes.inputWrapper,
							}}
							{...register("email")}
						/>
						<Button
							className={classes.control}
							disabled={isLoading}
							loading={isLoading}
							onClick={handleSubmit(onSubmit)}
						>
							Subscribe
						</Button>
					</div>
				</Box>
			</div>
			<Image
				src="/static/images/img-email.svg"
				className={classes.image}
				alt="email"
			/>
		</div>
	);
}
