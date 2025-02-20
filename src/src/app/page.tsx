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
  Connection,
  reconnectEdge,
} from "@xyflow/react";
import { useAtomValue } from "jotai";
import { useState, useCallback, useRef } from "react";

import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ControlPanel } from "@/components/lib/controls/control-panel";
import { FileNode } from "@/components/lib/node/file-node";
import { SidebarProvider } from "@/components/ui/sidebar";
import { initialEdges } from "@/constant/initial/edge";
import { initialNodes } from "@/constant/initial/node";
import { UploadButton } from "@/features/upload/components/upload-button";
import { UploadForm } from "@/features/upload/components/upload-form";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import { useIsMobile } from "@/hooks/use-mobile";
import { themeAtom } from "@/stores/theme";

export default function Flow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const edgeReconnectSuccessful = useRef(true);
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

  const onReconnectStart = () => {
    edgeReconnectSuccessful.current = false;
  };

  const onReconnect = (oldEdge: Edge, newConnection: Connection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((edge) => reconnectEdge(oldEdge, newConnection, edge));
  };

  const onReconnectEnd = (_: MouseEvent | TouchEvent, edge: Edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeReconnectSuccessful.current = true;
  };

  const nodeTypes = {
    file: FileNode,
  };

  return (
    <SidebarProvider className="w-full h-full">
      <ReactFlowProvider>
        <Header>a</Header>
        <Main>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onReconnectStart={onReconnectStart}
            onReconnect={onReconnect}
            onReconnectEnd={onReconnectEnd}
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
        <UploadForm />
      </ReactFlowProvider>
    </SidebarProvider>
  );
}
