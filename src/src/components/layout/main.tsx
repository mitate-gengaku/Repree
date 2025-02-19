"use client";

import { ReactNode } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props {
  children: ReactNode;
}

export const Main = ({ children }: Props) => {
  const isMobile = useIsMobile();

  return (
    <main className="w-full h-full pt-12">
      {isMobile ? (
        <>{children}</>
      ) : (
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            className="h-screen overflow-hidden border-r pt-4"
            minSize={20}
            defaultSize={30}
            maxSize={30}
          >
            <Sidebar></Sidebar>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      )}
    </main>
  );
};
