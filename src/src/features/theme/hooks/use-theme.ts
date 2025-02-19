import { ColorMode } from "@xyflow/react";
import { useSetAtom } from "jotai";
import { useTheme as useNextTheme } from "next-themes";
import { useEffect } from "react";

import { themeAtom } from "@/store/theme";

export const useTheme = () => {
  const setTheme = useSetAtom(themeAtom);
  const { theme, setTheme: setNextTheme } = useNextTheme();

  const onCustomTheme = (theme: ColorMode) => {
    setNextTheme(theme);
    setTheme(theme);
  };

  useEffect(() => {
    if (!theme) return;
    setTheme(theme as ColorMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    theme,
    onCustomTheme,
  };
};
