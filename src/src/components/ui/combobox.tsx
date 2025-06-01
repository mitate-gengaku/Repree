"use client";

import { Node } from "@xyflow/react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { isMobile } from "react-device-detect";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
  nodes: Node[];
  focusNode: (nodeId: string) => void;
}

export function Combobox({ nodes, focusNode }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={isMobile ? "sm" : "default"}
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? (nodes.find((node) => (node.data.label as string) === value)?.data
                .label as string)
            : "Search nodes..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-full min-w-72"
        align={isMobile ? "end" : "start"}
        sideOffset={10}
      >
        <Command>
          <CommandInput placeholder="Search nodes..." />
          <CommandList>
            <CommandEmpty>No node found.</CommandEmpty>
            <CommandGroup>
              {nodes.map((node) => (
                <CommandItem
                  key={node.id as string}
                  value={node.data.label as string}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);

                    if (currentValue !== value) {
                      focusNode(nodes.find((n) => n.id === node.id)?.id ?? "");
                    }
                  }}
                  className="data-[selected=true]:bg-sky-50 dark:data-[selected=true]:bg-sky-950"
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4 text-sky-500 dark:text-sky-400",
                      value === node.data.label ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {node.data.label as string}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
