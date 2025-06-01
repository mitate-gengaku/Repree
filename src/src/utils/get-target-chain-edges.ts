import { type Node, type Edge } from "@xyflow/react";

export const getTargetChainEdges = (
  allTargets: Node[],
  edges: Edge[],
): Edge[] => {
  const targetNodeIds = new Set(allTargets.map((node) => node.id));

  return edges.filter(
    (edge) => targetNodeIds.has(edge.source) && targetNodeIds.has(edge.target),
  );
};
