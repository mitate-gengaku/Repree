import { useReactFlow } from "@xyflow/react";

export const useZoomOut = () => {
  const { zoomOut } = useReactFlow();

  const onZoomOutHandler = () => {
    zoomOut({
      duration: 1000,
    });
  };

  return {
    onZoomOutHandler,
  };
};
