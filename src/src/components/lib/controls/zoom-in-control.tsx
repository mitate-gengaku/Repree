import { ControlButton } from "@xyflow/react";
import { PlusIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useZoomIn } from "@/hooks/use-zoom-in";

export const ZoomInControl = () => {
  const { onZoomInHandler } = useZoomIn();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ControlButton onClick={() => onZoomInHandler()}>
          <PlusIcon />
        </ControlButton>
      </TooltipTrigger>
      <TooltipContent>Zoom In</TooltipContent>
    </Tooltip>
  );
};
