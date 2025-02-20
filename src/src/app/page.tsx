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
  Connection,
  reconnectEdge,
  NodeMouseHandler,
} from "@xyflow/react";
import { useAtom, useAtomValue } from "jotai";
import { useState, useCallback, useRef } from "react";

import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ControlPanel } from "@/components/lib/controls/control-panel";
import { FileNode } from "@/components/lib/node/file-node";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UploadButton } from "@/features/upload/components/upload-button";
import { UploadForm } from "@/features/upload/components/upload-form";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import { useIsMobile } from "@/hooks/use-mobile";
import { edgesAtom } from "@/stores/edge";
import { nodesAtom } from "@/stores/node";
import { themeAtom } from "@/stores/theme";

/**
 * 選択したノードから始めてtargetを再帰的に探索する関数
 * targetが存在しなくなったら探索終了
 *
 * @param startNodeId 開始ノードのID
 * @param nodes ノードのリスト
 * @param edges エッジのリスト
 * @returns 探索されたすべてのノードの配列
 */
function exploreTargetsRecursively(
  startNodeId: string,
  nodes: Node[],
  edges: Edge[],
): Node[] {
  // 結果を格納する配列
  const exploredNodes: Node[] = [];

  // 訪問済みノードを追跡するセット（循環参照対策）
  const visitedNodeIds = new Set<string>();

  /**
   * 再帰的にターゲットを探索する内部関数
   * @param currentNodeId 現在探索中のノードID
   */
  function exploreTarget(currentNodeId: string) {
    // 既に訪問済みなら処理を終了（循環参照対策）
    if (visitedNodeIds.has(currentNodeId)) {
      return;
    }

    // 訪問済みに追加
    visitedNodeIds.add(currentNodeId);

    // 現在のノードを取得
    const currentNode = nodes.find((node) => node.id === currentNodeId);
    if (!currentNode) {
      return; // ノードが見つからない場合は終了
    }

    // 結果に追加
    exploredNodes.push(currentNode);

    // このノードがソースとなっているエッジ（このノードのtargetを見つける）
    const outgoingEdges = edges.filter((edge) => edge.source === currentNodeId);

    // targetが存在しない場合は、この経路の探索を終了
    if (outgoingEdges.length === 0) {
      return;
    }

    // 各targetノードに対して再帰的に探索
    for (const edge of outgoingEdges) {
      if (edge.target) {
        exploreTarget(edge.target);
      }
    }
  }

  // 探索開始
  exploreTarget(startNodeId);

  return exploredNodes;
}

/**
 * 選択したノードからtargetチェーンを取得する関数
 * 各レベルのtargetをグループ化して階層構造で返す
 *
 * @param startNodeId 開始ノードのID
 * @param nodes ノードのリスト
 * @param edges エッジのリスト
 * @returns 階層構造のtargetチェーン
 */
function getTargetChainByLevels(
  startNodeId: string,
  nodes: Node[],
  edges: Edge[],
): { node: Node; level: number }[] {
  // 結果配列
  const result: { node: Node; level: number }[] = [];

  // 訪問済みノードを追跡
  const visitedNodeIds = new Set<string>();

  /**
   * 再帰的にターゲットを探索して階層レベルも追跡
   */
  function exploreWithLevel(nodeId: string, level: number) {
    // 循環参照チェック
    if (visitedNodeIds.has(nodeId)) {
      return;
    }
    visitedNodeIds.add(nodeId);

    // ノード取得
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    // 結果に追加
    result.push({ node, level });

    // このノードのターゲットを探索
    const outgoingEdges = edges.filter((edge) => edge.source === nodeId);

    // 次のレベルのノードを探索
    for (const edge of outgoingEdges) {
      if (edge.target) {
        exploreWithLevel(edge.target, level + 1);
      }
    }
  }

  // レベル0から探索開始
  exploreWithLevel(startNodeId, 0);

  return result;
}

/**
 * 選択したノードから一番遠いtargetまでのパスを見つける
 * @returns 最長パスのノード配列
 */
function findLongestTargetPath(
  startNodeId: string,
  nodes: Node[],
  edges: Edge[],
): Node[] {
  let longestPath: Node[] = [];
  const visitedNodeIds = new Set<string>();

  function explorePath(nodeId: string, currentPath: Node[] = []) {
    // 循環参照チェック
    if (visitedNodeIds.has(nodeId)) {
      return;
    }
    visitedNodeIds.add(nodeId);

    // ノード取得
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    // 現在のパスに追加
    const updatedPath = [...currentPath, node];

    // このノードのターゲットを検索
    const outgoingEdges = edges.filter((edge) => edge.source === nodeId);

    // ターゲットがない場合（パスの終点）
    if (outgoingEdges.length === 0) {
      // これまでの最長パスより長ければ更新
      if (updatedPath.length > longestPath.length) {
        longestPath = updatedPath;
      }
      return;
    }

    // 各ターゲットに対して探索
    for (const edge of outgoingEdges) {
      if (edge.target) {
        // 新しいビジットセットを作成（各パスで独立した訪問履歴を持つ）
        const pathVisited = new Set(visitedNodeIds);
        explorePath(edge.target, updatedPath);
      }
    }
  }

  // 探索開始
  explorePath(startNodeId);

  return longestPath;
}

function getRelatedEdges(
  exploredNodeIds: string[] | Set<string>,
  edges: Edge[],
): Edge[] {
  // 配列の場合はセットに変換（検索効率向上）
  const nodeIdSet = Array.isArray(exploredNodeIds)
    ? new Set(exploredNodeIds)
    : exploredNodeIds;

  // 両端のノードが探索されたノードに含まれるエッジのみをフィルタリング
  return edges.filter((edge) => nodeIdSet.has(edge.source));
}

/**
 * 使用例: 選択したノードからすべてのtargetを探索
 */
function exploreAllTargets(
  nodes: Node[],
  edges: Edge[],
  selectedNodeId: string,
) {
  const exploredNodes = exploreTargetsRecursively(selectedNodeId, nodes, edges);

  /*// 階層ごとのtargetチェーンを取得
  const targetChainByLevels = getTargetChainByLevels(
    selectedNodeId,
    initialNodes,
    initialEdges
  );
  
  // レベルごとにグループ化
  const groupedByLevel = targetChainByLevels.reduce((acc, item) => {
    if (!acc[item.level]) {
      acc[item.level] = [];
    }
    acc[item.level].push(item.node);
    return acc;
  }, {} as Record<number, Node[]>);
    
  // 最長パスを取得
  const longestPath = findLongestTargetPath(
    selectedNodeId,
    initialNodes,
    initialEdges
  );*/

  return {
    allTargets: exploredNodes,
  };
}
function getTargetChainEdges(allTargets: Node[], edges: Edge[]): Edge[] {
  // ターゲットノードのIDをセットに変換（検索効率向上）
  const targetNodeIds = new Set(allTargets.map((node) => node.id));

  // ターゲットノード間のエッジのみをフィルタリング
  return edges.filter(
    (edge) => targetNodeIds.has(edge.source) && targetNodeIds.has(edge.target),
  );
}
export default function Flow() {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
  const [select, setSelect] = useState<Node | null>(null);
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

  const onNodeMouseEnter: NodeMouseHandler<Node> = useCallback((_, node) => {
    setNodes((nodes) => {
      const { allTargets } = exploreAllTargets(nodes, edges, node.id);

      const relatedEdges = [...getTargetChainEdges(allTargets, edges)].map(
        (edge) => {
          return {
            ...edge,
            animated: true,
            style: {
              ...edge.style,
              boxShadow: "0 0 20px 0 rgba(56,189,248,.4)",
              stroke: "#0284c7",
            },
          };
        },
      );
      const targetEdges = Array.from(
        new Map(
          [...edges, ...relatedEdges].map((edge) => [edge.id, edge]),
        ).values(),
      );

      setEdges(targetEdges);

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
  }, []);

  const onNodeMouseLeave = useCallback(() => {
    setEdges((edges) => {
      return edges.map((edge) => {
        return {
          ...edge,
          animated: false,
          style: undefined,
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
  }, []);

  return (
    <SidebarProvider className="w-full h-full">
      <Header>a</Header>
      <Main>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
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
    </SidebarProvider>
  );
}
