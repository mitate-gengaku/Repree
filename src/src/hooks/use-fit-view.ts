import { useReactFlow } from "@xyflow/react";

export const useFitView = () => {
  const { fitView } = useReactFlow();

  const onFitViewHandler = () => {
    fitView({
      duration: 1000,
    });
  };

  return {
    onFitViewHandler,
  };
};
