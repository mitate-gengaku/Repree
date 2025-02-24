import { NextRequest, NextResponse } from "next/server";

import ImportExportAnalyzer from "@/utils/analyze";

export async function POST(reqest: NextRequest): Promise<NextResponse> {
  const formData = await reqest.formData();
  const analyzer = new ImportExportAnalyzer();

  const files = formData.getAll("files[]");
  const { nodes, edges } = await analyzer.generateComponentGraph(
    Array.from(files) as File[],
  );

  const res = NextResponse.json({
    nodes: nodes,
    edges: edges,
  });

  return res;
}
