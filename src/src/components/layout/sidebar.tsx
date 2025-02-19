"use client";

import { ReactNode } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  children?: ReactNode;
}

export const Sidebar = ({ children }: Props) => {
  return (
    <div className="pt-3 px-4">
      <ScrollArea className="w-[calc(100%+0.75rem)] h-[calc(100vh-8.5rem)] pr-3">
        {children}
      </ScrollArea>
    </div>
  );
};
