import { UploadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const UploadButton = () => {
  return (
    <Button variant={"outline"} size={"icon"}>
      <UploadIcon />
    </Button>
  );
};
