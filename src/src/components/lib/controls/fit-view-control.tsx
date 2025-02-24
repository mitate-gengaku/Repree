import { ControlButton } from "@xyflow/react";
import { MaximizeIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFitView } from "@/hooks/use-fit-view";

export const FitViewControl = () => {
  const { onFitViewHandler } = useFitView();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ControlButton onClick={() => onFitViewHandler()}>
          <MaximizeIcon />
        </ControlButton>
      </TooltipTrigger>
      <TooltipContent>Fit View</TooltipContent>
    </Tooltip>
  );
};
