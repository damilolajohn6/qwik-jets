import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swift Jet - Premium Private Jet Rentals",
  description:
    "Experience luxury travel with our premium private jet rental service. Book your next flight with comfort and style.",
  keywords:
    "private jet, jet rental, luxury travel, charter flights, business aviation",
  authors: [{ name: "Swift Jet" }],
  openGraph: {
    title: "Swift Jet - Premium Private Jet Rentals",
    description:
      "Experience luxury travel with our premium private jet rental service.",
    type: "website",
    locale: "en_NG",
    siteName: "Swift Jet",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swift Jet - Premium Private Jet Rentals",
    description:
      "Experience luxury travel with our premium private jet rental service.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
