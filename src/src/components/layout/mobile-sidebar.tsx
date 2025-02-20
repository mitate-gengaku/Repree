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

export function MobileSidebar() {
  const setOpen = useSetAtom(openDialogAtom);
  const isMobile = useIsMobile();
  const { onDownloadImage } = useDownload();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>All Files</SidebarGroupLabel>
          <SidebarGroupContent></SidebarGroupContent>
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
