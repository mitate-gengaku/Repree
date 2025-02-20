import { useSetAtom } from "jotai";
import { CameraIcon, UploadIcon } from "lucide-react";

import { GithubLink } from "@/components/layout/github-link";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { openDialogAtom } from "@/stores/dialog";
import { TypeScriptIcon } from "@/components/icons/typescript";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function MobileSidebar() {
  const setOpen = useSetAtom(openDialogAtom);
  const isMobile = useIsMobile();
  const { onDownloadImage } = useDownload();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>All Files</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <Accordion type="single" collapsible>
              <AccordionItem value="a">
                <AccordionTrigger className="py-2 hover:no-underline outline-none">
                  <div className="flex items-center gap-1">
                    <TypeScriptIcon className="size-4 fill-[#3178C6] !rotate-0" />
                    step-data.ts
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[10px] text-muted-foreground">
                      directory
                    </h4>
                    <div className="px-[2px]">
                      <p className="leading-[1] text-sm">components</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[10px] text-muted-foreground">
                      path
                    </h4>
                    <div className="px-[2px]">
                      <p className="leading-[1] text-sm">src/components/libs/flow</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[10px] text-muted-foreground">
                      size
                    </h4>
                    <div className="px-[2px]">
                      <p className="leading-[1] text-sm">45MB</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
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
