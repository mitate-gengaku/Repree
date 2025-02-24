/* eslint @typescript-eslint/no-unsafe-member-access: 0, @typescript-eslint/no-explicit-any: 0, @typescript-eslint/no-unsafe-assignment: 0, @typescript-eslint/no-unsafe-call:0 */

import ELK from "elkjs/lib/elk.bundled.js";

import { Edge } from "@xyflow/react";
import { ElkGraph } from "@/types/elk-graph";
import { Node } from "@xyflow/react";

export class ELKLayoutCalculator {
  private nodes: Node[];
  private edges: Edge[];
  private elk: any;

  constructor(nodes: Node[], edges: Edge[]) {
    this.nodes = nodes;
    this.edges = edges;
    this.elk = new ELK();
  }

  private convertToElkGraph(): ElkGraph {
    return {
      id: "root",
      layoutOptions: {
        "elk.algorithm": "layered",
        "elk.spacing.nodeNode": "50",
        "elk.direction": "RIGHT",
        "elk.layered.spacing.nodeNodeBetweenLayers": "50",
        "elk.layered.mergeEdges": "true",
        "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
      },
      children: this.nodes.map((node) => ({
        id: node.id,
        width: 250,
        height: 120,
        labels: [{ text: node.data.name as string }],
      })),
      edges: this.edges.map((edge) => ({
        id: edge.id,
        sources: [edge.source],
        targets: [edge.target],
      })),
    };
  }

  async calculateLayout(): Promise<{ nodes: Node[]; edges: Edge[] }> {
    try {
      const elkGraph = this.convertToElkGraph();
      const graph = await this.elk.layout(elkGraph);

      const updatedNodes = this.nodes.map((node) => {
        const elkNode = graph.children.find(
          (child: any) => child.id === node.id,
        );
        return {
          ...node,
          position: {
            x: elkNode?.x || 0,
            y: elkNode?.y || 0,
          },
        };
      });

      return {
        nodes: updatedNodes,
        edges: this.edges,
      };
    } catch (error) {
      console.error("ELK Layout Calculation Error:", error);
      return { nodes: this.nodes, edges: this.edges };
    }
  }
}
