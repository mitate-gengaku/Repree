import { Analytics } from "@vercel/analytics/react";
import { ReactFlowProvider } from "@xyflow/react";
import { Geist } from "next/font/google";

import type { Metadata } from "next";

import "@/app/globals.css";
import "@xyflow/react/dist/base.css";

import { ThemeProvider } from "@/features/theme/components/theme-provider";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Repree",
  description:
    "A ReactFlow based application for visually designing and generating GitHub Actions workflow files. You can easily design workflows by simply connecting nodes, and download the YAML file.",
  metadataBase: new URL("https://repree.net"),
  openGraph: {
    title: "Repree",
    description:
      "A ReactFlow based application for visually designing and generating GitHub Actions workflow files. You can easily design workflows by simply connecting nodes, and download the YAML file.",
    url: "https://repree.net",
    siteName: "Repree",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Repree",
    description:
      "A ReactFlow based application for visually designing and generating GitHub Actions workflow files. You can easily design workflows by simply connecting nodes, and download the YAML file.",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactFlowProvider>{children}</ReactFlowProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
