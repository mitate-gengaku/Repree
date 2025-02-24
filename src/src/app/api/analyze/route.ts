import ImportExportAnalyzer from "@/utils/analyze";
import { NextRequest, NextResponse } from "next/server";
import path, { extname } from "node:path";
import { ExportDeclaration, ImportDeclaration, Project, SourceFile, SyntaxKind, VariableDeclarationKind } from "ts-morph"

interface Import {
  moduleSpecifier: string;
  isTypeOnly: boolean;
  defaultImport?: string;
  namespaceImport?: string;
  namedImports: any[];
  fullText: string;
}

interface Data {
  imports: Import[]
  exports: string[];
  fileName: string;
  path: string;
  size?: number
}

export async function POST(reqest: NextRequest): Promise<NextResponse> {
  const formData = await reqest.formData();
  const analyzer = new ImportExportAnalyzer();

  const files = formData.getAll("files[]")
  const { nodes, edges } = await analyzer.generateComponentGraph(Array.from(files) as File[]); 
  
  const res = NextResponse.json({ 
    nodes: nodes,
    edges: edges
   })

  return res;
}