import { useAtom } from "jotai";
import { CloudUploadIcon } from "lucide-react";

import { Spinner } from "@/components/loading/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { openDialogAtom } from "@/stores/dialog";

export const UploadForm = () => {
  const [open, setOpen] = useAtom(openDialogAtom);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Please upload or select the folder you want to analyze
          </DialogDescription>
        </DialogHeader>
        <Label
          htmlFor="file"
          className={cn(
            "flex h-56 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-card transition-all hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600",
            false &&
              "border-gray-600 bg-gray-100 dark:border-gray-500 dark:bg-gray-600",
          )}
          // onDragEnter={onDragEnter}
          // onDragLeave={onDragLeave}
          // onDragOver={onDragOver}
          // onDrop={onDrop}
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            {false ? (
              <Spinner className="text-sky-600" />
            ) : (
              <>
                <CloudUploadIcon
                  className={cn(
                    "mb-4 size-8 text-gray-500 dark:text-gray-400 xl:size-12",
                  )}
                />
                <p
                  className={cn(
                    "mb-2 text-sm font-medium leading-none text-gray-500 dark:text-gray-400",
                  )}
                >
                  Choose・Drag and Drop files
                </p>
              </>
            )}
          </div>
          <input
            id="file"
            name="file"
            type="file"
            accept=".md"
            className="sr-only"
            value={""}
            // onChange={handleFolderChange}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            directory="true"
            webkitdirectory="true"
            multiple={false}
          />
        </Label>
      </DialogContent>
    </Dialog>
  );
};
