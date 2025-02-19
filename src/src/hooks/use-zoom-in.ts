import { useReactFlow } from "@xyflow/react";

export const useZoomIn = () => {
  const { zoomIn } = useReactFlow();

  const onZoomInHandler = () => {
    zoomIn({
      duration: 1000,
    });
  };

  return {
    onZoomInHandler,
  };
};
