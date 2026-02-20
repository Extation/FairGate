import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientLayout } from "@/components/layout/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FairGate - Reputation-Gated Token Launchpad",
  description:
    "Access exclusive token launches, earn rewards, and build your on-chain reputation with FairScale integration on Solana.",
  keywords: [
    "Solana",
    "FairScale",
    "Launchpad",
    "IDO",
    "Reputation",
    "DeFi",
    "Token Launch",
  ],
  authors: [{ name: "FairGate" }],
  icons: {
    icon: "/images/fairscale_logo.jpg",
    shortcut: "/images/fairscale_logo.jpg",
    apple: "/images/fairscale_logo.jpg",
  },
  openGraph: {
    title: "FairGate - Reputation-Gated Token Launchpad",
    description:
      "Access exclusive token launches, earn rewards, and build your on-chain reputation with FairScale integration on Solana.",
    type: "website",
    locale: "en_US",
    siteName: "FairGate",
  },
  twitter: {
    card: "summary_large_image",
    title: "FairGate - Reputation-Gated Token Launchpad",
    description:
      "Access exclusive token launches, earn rewards, and build your on-chain reputation with FairScale integration on Solana.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-white dark:bg-dark-950 text-gray-900 dark:text-white antialiased`}>
        <WalletProvider>
          <ClientLayout>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow pt-16">{children}</main>
              <Footer />
            </div>
          </ClientLayout>
        </WalletProvider>
      </body>
    </html>
  );
}
