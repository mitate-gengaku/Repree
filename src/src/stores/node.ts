import { Node } from "@xyflow/react";
import { atom } from "jotai";

import { initialNodes } from "@/constant/initial-node";

export const nodesAtom = atom<Node[]>(initialNodes);
