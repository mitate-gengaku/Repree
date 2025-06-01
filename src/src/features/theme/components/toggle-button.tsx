"use client";

import { MoonIcon, SunIcon, MonitorCogIcon } from "lucide-react";
import * as React from "react";

import { Spinner } from "@/components/loading/spinner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/features/theme/hooks/use-theme";

export const ToggleThemeButton = () => {
  const [isLoad, setLoad] = React.useState(false);
  const { theme, onHandleTheme } = useTheme();

  React.useEffect(() => {
    setLoad(true);
  }, []);

  if (!isLoad)
    return (
      <Button
        variant={"ghost"}
        size={"icon"}
        className="ml-auto hidden invisible sm:block sm:visible"
        disabled
      >
        <Spinner className="text-sky-600" />
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="sm:ml-auto"
          suppressHydrationWarning
        >
          {theme === "light" && <SunIcon className="h-[1.2rem] w-[1.2rem]" />}
          {theme === "dark" && <MoonIcon className="h-[1.2rem] w-[1.2rem]" />}
          {theme === "system" && (
            <MonitorCogIcon className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="min-w-fit">
        <DropdownMenuItem onClick={() => onHandleTheme("light")}>
          <SunIcon />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onHandleTheme("dark")}>
          <MoonIcon />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onHandleTheme("system")}>
          <MonitorCogIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
