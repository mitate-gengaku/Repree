import { ControlButton } from "@xyflow/react";
import { CameraIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ScreenshotControl = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ControlButton>
          <CameraIcon className="!fill-white dark:!fill-slate-950" />
        </ControlButton>
      </TooltipTrigger>
      <TooltipContent>Screenshot</TooltipContent>
    </Tooltip>
  );
};
