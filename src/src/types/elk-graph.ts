export interface ElkGraph {
  id: string;
  layoutOptions: Record<string, string>;
  children: Array<{
    id: string;
    width: number;
    height: number;
    labels: Array<{ text: string }>;
    x?: number;
    y?: number;
  }>;
  edges: Array<{
    id: string;
    sources: string[];
    targets: string[];
  }>;
}
