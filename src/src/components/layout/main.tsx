"use client";

import { useAtom } from "jotai";
import { ReactNode } from "react";
import { isMobile } from "react-device-detect";

import { JavaScriptIcon } from "@/components/icons/javascript";
import { NpmLogoIcon } from "@/components/icons/npm";
import { TypeScriptIcon } from "@/components/icons/typescript";
import { Sidebar } from "@/components/layout/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Combobox } from "@/components/ui/combobox";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useFlow } from "@/hooks/use-flow";
import { nodesAtom } from "@/stores/node";

interface Props {
  children: ReactNode;
}

export const Main = ({ children }: Props) => {
  const [nodes, _] = useAtom(nodesAtom);
  const { onFocusNode } = useFlow();

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
                <Combobox nodes={nodes} focusNode={onFocusNode} />
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500 text-xs">All Files</p>
                  </div>
                  <Accordion type="single" collapsible className="mb-8">
                    {nodes
                      .filter((node) => node.type === "file")
                      .map((node) => (
                        <AccordionItem
                          value={node.id}
                          key={node.id}
                          className="relative"
                        >
                          <AccordionTrigger className="py-2 hover:no-underline outline-none">
                            <div className="flex items-center gap-1">
                              {/\.(js|jsx)$/.test(node.data.label as string) ? (
                                <JavaScriptIcon className="size-4 fill-[#F7DF1E]" />
                              ) : (
                                <TypeScriptIcon className="size-4 fill-[#3178C6]" />
                              )}
                              {node.data.label as string}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                              <h4 className="text-[10px] text-muted-foreground">
                                directory
                              </h4>
                              <div className="px-[2px]">
                                <p className="leading-[1] text-sm">
                                  {node.data.directory as string}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <h4 className="text-[10px] text-muted-foreground">
                                path
                              </h4>
                              <div className="px-[2px]">
                                <p className="leading-[1] text-sm">
                                  {node.data.path as string}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <h4 className="text-[10px] text-muted-foreground">
                                size
                              </h4>
                              <div className="px-[2px]">
                                <p className="leading-[1] text-sm">
                                  {(
                                    (node.data.size as number) /
                                    1024 ** 2
                                  ).toFixed(4)}
                                  MB
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>

                  <div className="flex items-center justify-between">
                    <p className="text-gray-500 text-xs">node_modules</p>
                  </div>
                  <Accordion type="single" collapsible>
                    {nodes
                      .filter((node) => node.type === "modules")
                      .map((node) => (
                        <AccordionItem
                          value={node.id}
                          key={node.id}
                          className="relative"
                        >
                          <AccordionTrigger className="py-2 hover:no-underline outline-none">
                            <div className="flex items-center gap-1">
                              <NpmLogoIcon className="size-4 fill-[#CB3837]" />
                              {node.data.label as string}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                              <h4 className="text-[10px] text-muted-foreground">
                                directory
                              </h4>
                              <div className="px-[2px]">
                                <p className="leading-[1] text-sm">
                                  {node.data.directory as string}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <h4 className="text-[10px] text-muted-foreground">
                                path
                              </h4>
                              <div className="px-[2px]">
                                <p className="leading-[1] text-sm">
                                  {node.data.path as string}
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
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
