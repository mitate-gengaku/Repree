"use client";

import { useAtom } from "jotai";
import { FormEvent, useRef, useState } from "react";

import { useFlow } from "@/hooks/use-flow";
import { fetchFolderAnalyze } from "@/service/fetch-folder-analyze";
import { openDialogAtom } from "@/stores/dialog";

export const useUpload = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useAtom(openDialogAtom);
  const { setNodes, setEdges } = useFlow();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
    const files = inputRef.current?.files;

    if (files) {
      for (const file of files) {
        formData.append("files[]", file, file.webkitRelativePath);
      }

      try {
        const response = await fetchFolderAnalyze("/api/analyze", formData);

        setNodes(response.nodes);
        setEdges(response.edges);

        setOpen(false);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setOpen(false);
        setLoading(false);
      }
    }
  };

  return {
    isLoading,
    inputRef,
    open,
    setOpen,
    handleSubmit,
  };
};
