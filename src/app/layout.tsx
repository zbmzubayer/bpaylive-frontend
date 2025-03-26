import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { HeroUiProvider, NextThemeProvider, TanstackQueryProvider } from "@/contexts";

import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://betlive24.com"),
  title: "BetLive24",
  description: "Watch live sports and enjoy the best matches on BetLive24.",
  keywords: [
    "betlive24",
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
      <body className={`${geistSans.className} antialiased`}>
        <HeroUiProvider>
          <NextThemeProvider>
            <TanstackQueryProvider>{children}</TanstackQueryProvider>
          </NextThemeProvider>
        </HeroUiProvider>
      </body>
    </html>
  );
}
