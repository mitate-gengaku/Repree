import { type Edge, type Node } from "@xyflow/react";

import { exploreTargetsRecursively } from "@/utils/explore-targets-recursively";

export const exploreAllTargets = (
  nodes: Node[],
  edges: Edge[],
  selectedNodeId: string,
) => {
  const exploredNodes = exploreTargetsRecursively(selectedNodeId, nodes, edges);

  return {
    allTargets: exploredNodes,
  };
};
