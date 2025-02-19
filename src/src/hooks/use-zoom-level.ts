import { useReactFlow, useViewport } from "@xyflow/react";

export const useZoomLevel = () => {
  const { zoom } = useViewport();
  const { zoomTo } = useReactFlow();

  const onSetZoomLevelHandler = () => {
    zoomTo(1, { duration: 1000 });
  };

  return {
    zoom: (100 * zoom).toFixed(0),
    onSetZoomLevelHandler,
  };
};
