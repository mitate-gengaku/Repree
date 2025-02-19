import { LoaderCircleIcon } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

export const Spinner = ({
  className,
  ...props
}: React.ComponentProps<"svg">) => (
  <LoaderCircleIcon
    className={cn("size-4 animate-spin", className)}
    aria-label="読み込み中"
    {...props}
  />
);
