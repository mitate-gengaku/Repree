"use client";

import { ReactNode } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
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
            <Sidebar>
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500 text-xs">All Files</p>
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="a">
                      <AccordionTrigger className="py-2 hover:no-underline outline-none">
                        a
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                          <h4 className="text-[10px] text-muted-foreground">
                            name
                          </h4>
                          <div className="px-[2px]">
                            <Input className="h-7 px-2 text-xs rounded-sm" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h4 className="text-[10px] text-muted-foreground">
                            on
                          </h4>
                          <div className="px-[2px]"></div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </Sidebar>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      )}
    </main>
  );
};
