import { CameraIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const ScreenshotButton = () => {
  return (
    <Button variant={"outline"} size={"icon"}>
      <CameraIcon />
    </Button>
  );
};
