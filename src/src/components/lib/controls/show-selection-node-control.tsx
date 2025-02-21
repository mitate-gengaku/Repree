import { ControlButton } from "@xyflow/react";
import { useAtomValue, useSetAtom } from "jotai";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { nodesAtom } from "@/stores/node";
import { selectNodeAtom } from "@/stores/select-node";

export const ShowSelectionNodeControl = () => {
  const [open, setOpen] = useState<boolean>(false);
  const isSelectNode = useAtomValue(selectNodeAtom);
  const setNodes = useSetAtom(nodesAtom);

  const onHandleOpen = () => {
    setOpen((open) => !open);

    if (!open) {
      setNodes((nodes) => {
        const filterNodes = nodes.map((node) => {
          if (!node.data.highlight) {
            return {
              ...node,
              hidden: true,
            };
          }
          return node;
        });

        return Array.from(
          new Map(
            [...nodes, ...filterNodes].map((node) => [node?.id, node]),
          ).values(),
        );
      });
      return;
    }

    setNodes((nodes) => {
      const filterNodes = nodes.map((node) => ({ ...node, hidden: false }));

      return Array.from(
        new Map(
          [...nodes, ...filterNodes].map((node) => [node?.id, node]),
        ).values(),
      );
    });
    return;
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ControlButton
          disabled={!isSelectNode}
          className="disabled:opacity-40"
          onClick={() => onHandleOpen()}
        >
          {open ? (
            <EyeOffIcon className="!fill-white dark:!fill-slate-950" />
          ) : (
            <EyeIcon className="!fill-white dark:!fill-slate-950" />
          )}
        </ControlButton>
      </TooltipTrigger>
      <TooltipContent>
        {open ? "Show all nodes" : "Show only related nodes"}
      </TooltipContent>
    </Tooltip>
  );
};
