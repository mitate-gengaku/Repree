/* eslint @typescript-eslint/no-explicit-any: 0 */

import * as path from "path";

import { Edge } from "@xyflow/react";
import { Node } from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";

import { FileAnalysis } from "@/types/file";
import { Import } from "@/types/import";
import { ELKLayoutCalculator } from "@/utils/elk-layout-calculator";

class ImportExportAnalyzer {
  private nodes: Node[] = [];
  private edges: Edge[] = [];
  private componentMap = new Map<
    string,
    { nodeId: string; imports: Import[]; exports: string[] }
  >();

  constructor() {}

  private filterJSFiles(files: File[]): File[] {
    return files.filter((file) =>
      [".js", ".jsx", ".ts", ".tsx"].includes(path.extname(file.name)),
    );
  }

  private async readFileContent(
    file: File,
  ): Promise<{ content: string; size: number }> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileContent = buffer.toString("utf-8");

    return {
      content: fileContent,
      size: file.size,
    };
  }

  private async analyzeFile(file: File): Promise<FileAnalysis> {
    const { content, size } = await this.readFileContent(file);
    const fileName = path.basename(file.name, path.extname(file.name));

    const imports = this.extractImports(content);
    const exports = this.extractExports(content);

    return {
      fileName,
      imports,
      exports,
      filePath: file.name,
      size,
    };
  }

  private extractImports(content: string): Import[] {
    const importRegex =
      /import\s+(?:(?:\*\s+as\s+(\w+))|(?:{([^}]+)})|(?:(\w+)))\s+from\s+['"]([^'"]+)['"]/g;
    const imports: Import[] = [];
    let match: RegExpExecArray | null;

    while ((match = importRegex.exec(content)) !== null) {
      const [, namespace, namedImports, defaultImport, source] = match;

      const specifiers: string[] = [];
      if (namespace) specifiers.push(namespace);
      if (namedImports) {
        specifiers.push(...namedImports.split(",").map((s) => s.trim()));
      }
      if (defaultImport) specifiers.push(defaultImport);

      imports.push({
        source,
        specifiers,
      });
    }

    return imports;
  }

  private extractExports(content: string): string[] {
    const namedExportRegex =
      /export\s+(?:const|let|var|function|class)\s+(\w+)/g;
    const defaultExportRegex =
      /export\s+default\s+(?:const|let|var|function|class)?\s*(\w+)?/;
    const namedExportFromRegex = /export\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]/;

    const exports: string[] = [];

    let namedMatch: RegExpExecArray | null;
    while ((namedMatch = namedExportRegex.exec(content)) !== null) {
      exports.push(namedMatch[1]);
    }

    const defaultMatch = content.match(defaultExportRegex);
    if (defaultMatch) {
      exports.push("default");
    }

    const namedFromMatch = content.match(namedExportFromRegex);
    if (namedFromMatch) {
      const namedExports = namedFromMatch[1].split(",").map((s) => s.trim());
      exports.push(...namedExports);
    }

    return exports;
  }

  private splitFileNameAndPath(value: string) {
    const splitedValue = value.split("/");

    const fileName = splitedValue.pop();
    const dir = splitedValue.slice(-1)[0];
    const filePath = value.split("/").slice(0, -1).join("/");

    return {
      name: fileName ?? "",
      dir: dir,
      path: filePath,
    };
  }

  async generateComponentGraph(
    files: File[],
  ): Promise<{ nodes: Node[]; edges: Edge[] }> {
    const jsFiles = this.filterJSFiles(files);

    const fileAnalyses = await Promise.all(
      jsFiles.map((file) => this.analyzeFile(file)),
    );

    fileAnalyses.forEach((analysis, index) => {
      const id = uuidv4();
      const nodeId = `node_${index}_${analysis.filePath}_${id}`;
      const { name, dir, path } = this.splitFileNameAndPath(analysis.filePath);

      const node: Node = {
        id: nodeId,
        data: {
          label: name,
          directory: dir,
          path: path,
          size: analysis.size,
          highlight: false,
        },
        type: "file",
        position: { x: 0, y: 0 },
      };

      this.nodes.push(node);
      this.componentMap.set(name, {
        nodeId,
        imports: analysis.imports,
        exports: analysis.exports,
      });
    });

    this.nodes.forEach((node) => {
      const sourceComponent = this.componentMap.get(node.data.label as string);
      if (sourceComponent) {
        sourceComponent.imports.forEach((importItem) => {
          const id = uuidv4();
          const targetComponentName = path.basename(
            importItem.source,
            path.extname(importItem.source),
          );
          const targetComponent = Array.from(this.componentMap.entries()).find(
            ([label]) =>
              label.slice(0, label.lastIndexOf(".")) === targetComponentName,
          );

          if (targetComponent) {
            this.edges.push({
              id: `edge_${node.id}_${targetComponent[1].nodeId}_${id}`,
              source: targetComponent[1].nodeId,
              target: node.id,
              sourceHandle: "",
              targetHandle: "",
            });
          }
        });
      }
    });

    const layoutCalculator = new ELKLayoutCalculator(this.nodes, this.edges);
    const graphWithLayout = await layoutCalculator.calculateLayout();

    return graphWithLayout;
  }
}

export default ImportExportAnalyzer;
