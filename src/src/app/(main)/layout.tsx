import "@/app/globals.css";
import "@xyflow/react/dist/base.css";

import { ReactFlowProvider } from "@xyflow/react";

import { Header } from "@/components/layout/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/features/theme/components/theme-provider";
import { UploadForm } from "@/features/upload/components/upload-form";

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
        <SidebarProvider className="w-full h-full">
          <Header />
          {children}
          <UploadForm />
        </SidebarProvider>
      </ReactFlowProvider>
    </ThemeProvider>
  );
}
