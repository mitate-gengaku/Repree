"use client";

import {
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  SelectionMode,
  Panel,
  MiniMap,
  Background,
  NodeMouseHandler,
  useReactFlow,
} from "@xyflow/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";

import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ControlPanel } from "@/components/lib/controls/control-panel";
import { HighlightEdge } from "@/components/lib/edge/highlight";
import { FileNode } from "@/components/lib/node/file-node";
import { NodeModulesNode } from "@/components/lib/node/node-modules-node";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UploadButton } from "@/features/upload/components/upload-button";
import { UploadForm } from "@/features/upload/components/upload-form";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import { useIsMobile } from "@/hooks/use-mobile";
import { edgesAtom } from "@/stores/edge";
import { nodesAtom } from "@/stores/node";
import { selectNodeAtom } from "@/stores/select-node";
import { themeAtom } from "@/stores/theme";

function exploreTargetsRecursively(
  startNodeId: string,
  nodes: Node[],
  edges: Edge[],
): Node[] {
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
}

function exploreAllTargets(
  nodes: Node[],
  edges: Edge[],
  selectedNodeId: string,
) {
  const exploredNodes = exploreTargetsRecursively(selectedNodeId, nodes, edges);

  return {
    allTargets: exploredNodes,
  };
}

function getTargetChainEdges(allTargets: Node[], edges: Edge[]): Edge[] {
  const targetNodeIds = new Set(allTargets.map((node) => node.id));

  return edges.filter(
    (edge) => targetNodeIds.has(edge.source) && targetNodeIds.has(edge.target),
  );
}
export default function Flow() {
  const setSelect = useSetAtom(selectNodeAtom);
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
  const theme = useAtomValue(themeAtom);
  const isTouchDevice = useIsTouchDevice();
  const isMobile = useIsMobile();
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

  const focusNode = useCallback(
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
      focusNode(node.id);
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
    [edges, focusNode, setEdges, setNodes, setSelect],
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

  return (
    <SidebarProvider className="w-full h-full">
      <Header focusNode={focusNode} />
      <Main focusNode={focusNode}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onConnect={onConnect}
          snapToGrid={true}
          snapGrid={[25, 25]}
          fitView
          fitViewOptions={{
            duration: 1000,
          }}
          minZoom={0.1}
          panOnScroll
          selectionOnDrag={!isTouchDevice}
          panOnDrag={[1, 2]}
          selectionMode={SelectionMode.Partial}
          colorMode={theme}
        >
          {!isMobile && (
            <Panel position="top-right">
              <UploadButton />
            </Panel>
          )}
          <Panel position="bottom-left" className="bottom-4">
            <ControlPanel />
          </Panel>
          <Panel position="bottom-right" className="bottom-4">
            <MiniMap />
          </Panel>
          <Background />
        </ReactFlow>
      </Main>
      <UploadForm />
    </SidebarProvider>
  );
}
