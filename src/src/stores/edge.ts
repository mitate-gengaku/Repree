import { Edge } from "@xyflow/react";
import { atom } from "jotai";

import { initialEdges } from "@/constant/initial/edge";

export const edgesAtom = atom<Edge[]>(initialEdges);
