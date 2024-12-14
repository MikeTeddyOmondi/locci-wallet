import "@mantine/core/styles.css";
import "mantine-react-table/styles.css";

import {
  ColorSchemeScript,
  DirectionProvider,
  MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Analytics } from "@vercel/analytics/react";
import { spaceGrotesk } from "@/styles/fonts";
import { theme } from "@/styles/theme";
import { AppProvider } from "./provider";

export const metadata = {
	metadataBase: new URL("https://locci-wallet.miketeddyomondi.dev/"),
	title: { default: "Locci Wallet", template: "%s | Locci Wallet" },
	description: "Locci Wallet your mobile wallet of choice",
	keywords: ["Locci", "Wallet", "fintech", "finance"],
	authors: [
		{
			name: "miketeddyomondi",
			url: "https://www.miketeddyomondi.dev",
		},
	],
	creator: "miketeddyomondi",
	manifest: "https://locci-wallet.miketeddyomondi.dev/site.webmanifest",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={spaceGrotesk.className}>
        <DirectionProvider>
          <MantineProvider theme={theme}>
            <ModalsProvider>
              <AppProvider>{children}</AppProvider>
              {/* <Analytics /> */}
            </ModalsProvider>
            <Notifications />
          </MantineProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
