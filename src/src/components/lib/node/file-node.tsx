import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { memo } from "react";

import { TypeScriptIcon } from "@/components/icons/typescript";
import { cn } from "@/lib/utils";
import { FileNodeData } from "@/types/file-node-data";

export const FileNode = memo(
  ({ data, selected }: NodeProps<Node<FileNodeData>>) => {
    return (
      <>
        <div
          className={cn(
            "pb-4 text-sm border bg-white dark:bg-slate-950 w-[17rem] max-w-[17rem] flex flex-col gap-2 rounded shadow duration-200 transition-all",
            selected &&
              "border-blue-500 dark:border-blue-700 [box-shadow:0_0_20px_0_rgba(56,189,248,.4)]",
          )}
        >
          <div className="flex items-center gap-2 py-2 bg-slate-100 dark:bg-slate-900 px-3 rounded-tr rounded-tl">
            <TypeScriptIcon className="size-4 fill-[#3178C6]" />
            {data.label}
          </div>
          <div className="px-3 text-[10px]">
            <h3>directory: </h3>
            <p className="leading-[1] text-gray-500">components</p>
          </div>
          <div className="px-3 text-[10px]">
            <h3>path: </h3>
            <p className="leading-[1] text-gray-500">
              src/components/libs/flow
            </p>
          </div>
          <div className="px-3 text-[10px]">
            <h3>size: </h3>
            <p className="leading-[1] text-gray-500">45MB</p>
          </div>
        </div>
        <Handle
          type="target"
          position={Position.Left}
          className="!-left-4 size-3 border border-gray-600 !bg-white rounded-[2px]"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!-right-4 size-3 border border-gray-600 !bg-white rounded-[2px]"
        />
      </>
    );
  },
);

FileNode.displayName = "FileNode";
