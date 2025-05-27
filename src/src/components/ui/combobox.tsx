"use client";

import { Node } from "@xyflow/react";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

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
        className="max-w-[255px] md:maw-w-auto md:min-w-[200px] p-0"
        align="start"
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
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
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
