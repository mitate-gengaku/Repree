import "@/app/globals.css";
import "@xyflow/react/dist/base.css";

import { ReactFlowProvider } from "@xyflow/react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/features/theme/components/theme-provider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReactFlowProvider>
        <SidebarProvider className="w-full h-full">{children}</SidebarProvider>
      </ReactFlowProvider>
    </ThemeProvider>
  );
}
