import type { Metadata } from "next";

import { ENV_CLIENT, inter } from "@/config";
import { HeroUiProvider, NextThemeProvider, TanstackQueryProvider } from "@/contexts";

import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(ENV_CLIENT.NEXT_PUBLIC_BASE_URL),
  title: "BetPayLive",
  description: "Watch live sports and enjoy the best matches on BetPayLive.",
  keywords: [
    "betpaylive",
    "bpaylive",
    "betlive",
    "live stream",
    "watch live",
    "live sports",
    "sports",
    "advertisement",
    "live",
    "stream",
    "watch",
    "sports",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <HeroUiProvider>
          <NextThemeProvider>
            <TanstackQueryProvider>{children}</TanstackQueryProvider>
          </NextThemeProvider>
        </HeroUiProvider>
      </body>
    </html>
  );
}
