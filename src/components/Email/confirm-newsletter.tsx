import * as React from "react";
import { Html, Button, Container, Text, Hr, Heading } from "@react-email/components";

interface ConfirmNewsletterTemplateProps {
    url: string
}

export const ConfirmNewsletterTemplate: React.FC<
	Readonly<ConfirmNewsletterTemplateProps>
> = ({ url }) => (
	<Html>
		<Container>
			<Heading as="h3">Locci Wallet Newsletter</Heading>
			<Text>Confirm your email to subscribe to Locci newsletter</Text>
			<Button href={url} style={{ color: "#61dafb" }}>
				Subscribe
			</Button>
			<Hr />
			<Text>Incase you got this email by mistake you can ignore it.</Text>
		</Container>
	</Html>
);
