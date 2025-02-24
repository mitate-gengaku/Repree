import { useAtom, useSetAtom } from "jotai";
import { FolderIcon } from "lucide-react";
import { FormEvent, useRef, useState } from "react";

import { Spinner } from "@/components/loading/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { fetchFolderAnalyze } from "@/service/fetch-folder-analyze";
import { openDialogAtom } from "@/stores/dialog";
import { edgesAtom } from "@/stores/edge";
import { nodesAtom } from "@/stores/node";

export const UploadForm = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useAtom(openDialogAtom);
  const setNodes = useSetAtom(nodesAtom);
  const setEdges = useSetAtom(edgesAtom);

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

        console.log(response.nodes);
        console.log(response.edges);

        setOpen(false);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setOpen(false);
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Please upload or select the folder you want to analyze
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Label
            htmlFor="file"
            className={cn(
              "mb-4 flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-card transition-all hover:bg-gray-100 dark:border-sky-600 dark:bg-sky-700 dark:hover:border-sky-500 dark:hover:bg-sky-600",
            )}
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <FolderIcon
                className={cn(
                  "mb-4 size-8 text-gray-500 dark:text-gray-400 xl:size-12",
                )}
              />
              <p
                className={cn(
                  "text-sm font-medium leading-none text-gray-500 dark:text-gray-400",
                )}
              >
                Choose Folder
              </p>
            </div>
            <input
              id="file"
              name="file"
              type="file"
              accept=".md"
              className="sr-only"
              ref={inputRef}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              directory="true"
              webkitdirectory="true"
              multiple={false}
            />
          </Label>
          <Button
            className="w-full px-4 bg-sky-500 hover:bg-sky-600"
            disabled={isLoading}
          >
            {isLoading ? <Spinner className="text-white" /> : "Upload"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
