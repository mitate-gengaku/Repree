import Link from "next/link";

import { GithubLogoIcon } from "@/components/icons/github";

interface Props {
  isMobile?: boolean;
}

export const GithubLink = ({ isMobile = false }: Props) => (
  <Link
    href={"https://github.com/mitate-gengaku/Repree"}
    className="w-full h-full flex md:justify-center items-center gap-2"
  >
    <GithubLogoIcon />
    {isMobile && "Go to Github"}
  </Link>
);
