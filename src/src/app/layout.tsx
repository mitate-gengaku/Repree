import { Analytics } from "@vercel/analytics/react";
import { Geist } from "next/font/google";

import type { Metadata } from "next";

import "@/app/globals.css";
import "@xyflow/react/dist/base.css";

import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Repree",
  description:
    "A React flow based tool that visualizes files and components connected by import/export. It's a useful tool during development activities such as refactoring. You can easily visualize by simply uploading the folder you want to visualize.",
  metadataBase: new URL("https://repree.net"),
  openGraph: {
    title: "Repree",
    description:
      "A React flow based tool that visualizes files and components connected by import/export. It's a useful tool during development activities such as refactoring. You can easily visualize by simply uploading the folder you want to visualize.",
    url: "https://repree.net",
    siteName: "Repree",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Repree",
    description:
      "A React flow based tool that visualizes files and components connected by import/export. It's a useful tool during development activities such as refactoring. You can easily visualize by simply uploading the folder you want to visualize.",
    creator: "@mitate-gengaku",
    creatorId: "1776914915519045632",
  },
  authors: [{ name: "Mitate Gengaku", url: "https://mitate-gengaku.com" }],
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("w-screen h-screen antialiased", geistSans.variable)}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
