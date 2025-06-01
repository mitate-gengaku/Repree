import { type Edge, type Node } from "@xyflow/react";

export const exploreTargetsRecursively = (
  startNodeId: string,
  nodes: Node[],
  edges: Edge[],
): Node[] => {
  const exploredNodes: Node[] = [];

  const visitedNodeIds = new Set<string>();

  function exploreTarget(currentNodeId: string) {
    if (visitedNodeIds.has(currentNodeId)) {
      return;
    }

    visitedNodeIds.add(currentNodeId);

    const currentNode = nodes.find((node) => node.id === currentNodeId);
    if (!currentNode) {
      return;
    }

    exploredNodes.push(currentNode);

    const outgoingEdges = edges.filter((edge) => edge.source === currentNodeId);

    if (outgoingEdges.length === 0) {
      return;
    }

    for (const edge of outgoingEdges) {
      if (edge.target) {
        exploreTarget(edge.target);
      }
    }
  }

  exploreTarget(startNodeId);

  return exploredNodes;
};
