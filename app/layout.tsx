import { SiteDescription, SiteTitle } from "@/staticValues/info";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SiteTitle,
  description: SiteDescription,
  twitter: {
    card: "summary_large_image",
    title: SiteTitle,
    description: SiteDescription,
    site: "@kaizen_keikaku",
    creator: "@ishiyamaism",
    images: "/profile.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
