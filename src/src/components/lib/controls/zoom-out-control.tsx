import { ControlButton } from "@xyflow/react";
import { MinusIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useZoomOut } from "@/hooks/use-zoom-out";

export const ZoomOutControl = () => {
  const { onZoomOutHandler } = useZoomOut();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ControlButton onClick={() => onZoomOutHandler()}>
          <MinusIcon />
        </ControlButton>
      </TooltipTrigger>
      <TooltipContent>Zoom Out</TooltipContent>
    </Tooltip>
  );
};
