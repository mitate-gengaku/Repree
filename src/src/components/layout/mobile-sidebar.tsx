import { useAtomValue, useSetAtom } from "jotai";
import { CameraIcon, UploadIcon } from "lucide-react";
import { isMobile } from "react-device-detect";

import { JavaScriptIcon } from "@/components/icons/javascript";
import { NpmLogoIcon } from "@/components/icons/npm";
import { TypeScriptIcon } from "@/components/icons/typescript";
import { GithubLink } from "@/components/layout/github-link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ThemeSwitch } from "@/features/theme/components/theme-switch";
import { useDownload } from "@/hooks/use-download";
import { openDialogAtom } from "@/stores/dialog";
import { nodesAtom } from "@/stores/node";

export function MobileSidebar() {
  const nodes = useAtomValue(nodesAtom);
  const setOpen = useSetAtom(openDialogAtom);
  const { onDownloadImage } = useDownload();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>All Files</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <Accordion type="single" collapsible>
              {nodes
                .filter((node) => node.type === "file")
                .map((node) => (
                  <AccordionItem value={node.id} key={node.id}>
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
                            {((node.data.size as number) / 1024 ** 2).toFixed(
                              4,
                            )}
                            MB
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>node_modules</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <Accordion type="single" collapsible>
              {nodes
                .filter((node) => node.type === "modules")
                .map((node) => (
                  <AccordionItem value={node.id} key={node.id}>
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
                      <div className="flex flex-col gap-1">
                        <h4 className="text-[10px] text-muted-foreground">
                          size
                        </h4>
                        <div className="px-[2px]">
                          <p className="leading-[1] text-sm">
                            {((node.data.size as number) / 1024 ** 2).toFixed(
                              4,
                            )}
                            MB
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuButton onClick={() => setOpen((open) => !open)}>
              <UploadIcon />
              Upload
            </SidebarMenuButton>
            <SidebarMenuButton onClick={() => onDownloadImage()}>
              <CameraIcon />
              Screenshot
            </SidebarMenuButton>
            <SidebarMenuButton className="mb-2">
              <GithubLink isMobile={isMobile} />
            </SidebarMenuButton>
            <div className="flex flex-col gap-2">
              <p className="text-xs">Dark Mode</p>
              <ThemeSwitch />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
