import { ControlButton } from "@xyflow/react";
import { CameraIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDownload } from "@/hooks/use-download";

export const ScreenshotControl = () => {
  const {
    onDownloadImage,
  } = useDownload();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ControlButton onClick={() => onDownloadImage()}>
          <CameraIcon className="!fill-white dark:!fill-slate-950" />
        </ControlButton>
      </TooltipTrigger>
      <TooltipContent>Screenshot</TooltipContent>
    </Tooltip>
  );
};
