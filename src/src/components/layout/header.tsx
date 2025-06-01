"use client";

import { isMobile } from "react-device-detect";

import { SiteLogo } from "@/components/icons/site-logo";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { GithubLink } from "@/components/utils/github-link";
import { ToggleThemeButton } from "@/features/theme/components/toggle-button";
import { useFlow } from "@/hooks/use-flow";

export const Header = () => {
  const { nodes, onFocusNode } = useFlow();

  return (
    <header className="w-full fixed top-0 border-b">
      <div className="px-4 mx-auto h-12 flex justify-start items-center gap-2 relative sm:static">
        {isMobile && (
          <>
            <SidebarTrigger className="absolute left-4" />
            <MobileSidebar />
          </>
        )}
        <h1 className="ml-8 sm:mx-0 select-none flex items-center font-bold cursor-default">
          <SiteLogo className="w-16 sm:w-24" />
        </h1>
        {isMobile && (
          <div className="ml-auto">
            <Combobox nodes={nodes} focusNode={onFocusNode} />
          </div>
        )}
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
