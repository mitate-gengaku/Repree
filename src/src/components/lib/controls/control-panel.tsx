import { Controls } from "@xyflow/react";

import { FitViewControl } from "@/components/lib/controls/fit-view-control";
import { ScreenshotControl } from "@/components/lib/controls/screenshot-control";
import { ZoomInControl } from "@/components/lib/controls/zoom-in-control";
import { ZoomLevelControl } from "@/components/lib/controls/zoom-level-control";
import { ZoomOutControl } from "@/components/lib/controls/zoom-out-control";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const ControlPanel = () => {
  return (
    <Controls showZoom={false} showFitView={false} showInteractive={false}>
      <TooltipProvider>
        <div
          className={cn(
            "[&>button]:bg-white dark:[&>button]:bg-slate-950 [&>button]:outline-none [&>button]:ring-0 [&>button]:border [&>button]:size-7 [&>button:hover]:bg-slate-100 [&>button]:transition-all",
            "[&>button:not(:last-child)]:border-b-0",
          )}
        >
          <ZoomInControl />
          <ZoomLevelControl />
          <ZoomOutControl />
          <FitViewControl />
          <ScreenshotControl />
        </div>
      </TooltipProvider>
    </Controls>
  );
};
