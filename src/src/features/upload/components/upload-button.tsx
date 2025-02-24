import { useSetAtom } from "jotai";
import { UploadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { openDialogAtom } from "@/stores/dialog";

export const UploadButton = () => {
  const setOpen = useSetAtom(openDialogAtom);

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      onClick={() => setOpen((open) => !open)}
    >
      <UploadIcon />
    </Button>
  );
};
