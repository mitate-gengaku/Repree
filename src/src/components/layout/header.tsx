"use client";

import { SiteLogo } from "@/components/icons/site-logo";
import { GithubLink } from "@/components/layout/github-link";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ToggleThemeButton } from "@/features/theme/components/toggle-button";
import { useIsMobile } from "@/hooks/use-mobile";

export const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="w-full fixed top-0 border-b">
      <div className="px-4 mx-auto h-12 flex justify-start items-center gap-2 relative md:static">
        {isMobile && (
          <>
            <SidebarTrigger className="absolute left-4" />
            <MobileSidebar />
          </>
        )}
        <h1 className="mx-auto md:mx-0 select-none flex items-center font-bold cursor-default">
          <SiteLogo className="w-24 h-7" />
        </h1>
        {!isMobile && (
          <div className="ml-auto flex items-center gap-2">
            <ToggleThemeButton />
            <Button variant={"outline"} size={"icon"}>
              <GithubLink isMobile={isMobile} />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
