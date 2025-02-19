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
  ReactFlowProvider,
  SelectionMode,
  Panel,
  MiniMap,
  Background,
} from "@xyflow/react";
import { useAtomValue } from "jotai";
import { useState, useCallback } from "react";

import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ControlPanel } from "@/components/lib/controls/control-panel";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UploadButton } from "@/features/upload/components/upload-button";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import { useIsMobile } from "@/hooks/use-mobile";
import { themeAtom } from "@/stores/theme";

const initialNodes: Node[] = [
  { id: "1", data: { label: "Node 1" }, position: { x: 5, y: 5 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 5, y: 100 } },
];

const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

export default function Flow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const theme = useAtomValue(themeAtom);
  const isTouchDevice = useIsTouchDevice();
  const isMobile = useIsMobile();

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

  return (
    <SidebarProvider className="w-full h-full">
      <ReactFlowProvider>
        <Header>a</Header>
        <Main>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            // nodeTypes
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            // onReconnectStart={onReconnectStart}
            // onReconnect={onReconnect}
            // onReconnectEnd={onReconnectEnd}
            // isValidConnection={isValidConnection}
            snapToGrid={true}
            snapGrid={[25, 25]}
            fitView
            fitViewOptions={{
              duration: 1000,
            }}
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
      </ReactFlowProvider>
    </SidebarProvider>
  );
}
