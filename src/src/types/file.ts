import { Import } from "@/types/import";

export interface FileAnalysis {
  fileName: string;
  imports: Import[];
  exports: string[];
  filePath: string;
  size: number;
}
