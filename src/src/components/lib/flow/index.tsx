"use client";

import {
  ReactFlow,
  SelectionMode,
  Panel,
  MiniMap,
  Background,
} from "@xyflow/react";
import { isMobile } from "react-device-detect";

import { Main } from "@/components/layout/main";
import { ControlPanel } from "@/components/lib/controls/control-panel";
import { UploadButton } from "@/features/upload/components/upload-button";
import { useFlow } from "@/hooks/use-flow";

export const Flow = () => {
  const {
    nodes,
    edges,
    theme,
    nodeTypes,
    edgeTypes,
    onNodeClick,
    onNodesChange,
    onEdgesChange,
    onPaneClick,
    onConnect,
  } = useFlow();

  return (
    <Main>
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
        selectionOnDrag={!isMobile}
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
  );
};
