"use client";

import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  NodeMouseHandler,
  useReactFlow,
} from "@xyflow/react";
import { useAtom } from "jotai";
import { useCallback, useMemo } from "react";

import { HighlightEdge } from "@/components/lib/edge/highlight";
import { FileNode } from "@/components/lib/node/file-node";
import { NodeModulesNode } from "@/components/lib/node/node-modules-node";
import { edgesAtom } from "@/stores/edge";
import { nodesAtom } from "@/stores/node";
import { selectNodeAtom } from "@/stores/select-node";
import { themeAtom } from "@/stores/theme";
import { exploreAllTargets } from "@/utils/explore-all-targets";
import { getTargetChainEdges } from "@/utils/get-target-chain-edges";

export const useFlow = () => {
  const [_, setSelect] = useAtom(selectNodeAtom);
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
  const [theme] = useAtom(themeAtom);
  const { setCenter } = useReactFlow();

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const onFocusNode = useCallback(
    (nodeId: string) => {
      const node = nodes.find((n) => n.id === nodeId);
      if (node) {
        setCenter(node.position.x + 120, node.position.y + 90, {
          zoom: 1,
          duration: 800,
        });
      }
    },
    [nodes, setCenter],
  );

  const onNodeClick: NodeMouseHandler<Node> = useCallback(
    (_, node) => {
      setSelect(true);
      onFocusNode(node.id);
      setNodes((nodes) => {
        const { allTargets } = exploreAllTargets(nodes, edges, node.id);

        const relatedEdges = [...getTargetChainEdges(allTargets, edges)].map(
          (edge) => {
            return {
              ...edge,
              type: "highlight",
            };
          },
        );

        setEdges((edges) => {
          return [
            ...Array.from(
              new Map(
                [...edges, ...relatedEdges].map((edge) => [edge.id, edge]),
              ).values(),
            ),
          ];
        });

        const targetNodes = allTargets.map((node) => {
          return {
            ...node,
            data: {
              ...node.data,
              highlight: true,
            },
          };
        });

        return Array.from(
          new Map(
            [...nodes, ...targetNodes].map((node) => [node.id, node]),
          ).values(),
        );
      });
    },
    [edges, onFocusNode, setEdges, setNodes, setSelect],
  );

  const onPaneClick = useCallback(() => {
    setEdges((edges) => {
      return edges.map((edge) => {
        return {
          ...edge,
          type: "default",
        };
      });
    });
    setNodes((nodes) => {
      return nodes.map((node) => {
        return {
          ...node,
          selected: false,
          data: {
            ...node.data,
            highlight: false,
          },
        };
      });
    });
    setSelect(false);
  }, [setEdges, setNodes, setSelect]);

  const nodeTypes = {
    file: FileNode,
    modules: NodeModulesNode,
  };

  const edgeTypes = {
    highlight: HighlightEdge,
  };

  const files = useMemo(
    () => nodes.filter((node) => node.type === "file"),
    [nodes],
  );

  const nodeModules = useMemo(
    () => nodes.filter((node) => node.type === "modules"),
    [nodes],
  );

  return {
    nodes,
    edges,
    theme,
    nodeTypes,
    edgeTypes,
    nodeModules,
    files,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onNodeClick,
    onPaneClick,
    onFocusNode,
    onConnect,
  };
};
