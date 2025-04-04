import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { memo } from "react";

import { NpmLogoIcon } from "@/components/icons/npm";
import { cn } from "@/lib/utils";
import { CustomNodeData } from "@/types/custom-node-data";

export const NodeModulesNode = memo(
  ({ data, selected }: NodeProps<Node<CustomNodeData>>) => {
    return (
      <>
        <div
          className={cn(
            "pb-4 text-sm border bg-white dark:bg-slate-950 w-[17rem] max-w-[17rem] flex flex-col gap-2 rounded shadow duration-200 transition-all",
            (selected || data.highlight) &&
              "border-blue-600 dark:border-blue-700 [box-shadow:0_0_20px_0_rgba(56,189,248,.4)]",
          )}
        >
          <div className="flex items-center gap-2 py-2 bg-slate-100 dark:bg-slate-900 px-3 rounded-tr rounded-tl">
            <NpmLogoIcon className="size-4 fill-[#CB3837]" />
            {data.label}
          </div>
          {data.directory && (
            <div className="px-3 text-[10px]">
              <h3>directory: </h3>
              <p className="leading-[1] text-gray-500">{data.directory}</p>
            </div>
          )}
          {data.path && (
            <div className="px-3 text-[10px]">
              <h3>path: </h3>
              <p className="leading-[1] text-gray-500">{data.path}</p>
            </div>
          )}
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

NodeModulesNode.displayName = "NodeModulesNode";
