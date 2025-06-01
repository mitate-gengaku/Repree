import { CameraIcon } from "lucide-react";
import React from "react";

export const ScreenshotButton = (props: React.ComponentProps<"button">) => (
  <button {...props}>
    <CameraIcon />
    Screenshot
  </button>
);
