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
import { useIsMobile } from "@/hooks/use-mobile";

export function MobileSidebar() {
  const isMobile = useIsMobile();

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
            <SidebarMenuButton>
              <UploadIcon />
              Upload
            </SidebarMenuButton>
            <SidebarMenuButton>
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
