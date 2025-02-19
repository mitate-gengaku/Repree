"use client";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/features/theme/hooks/use-theme";

export const ThemeSwitch = () => {
  const { theme, onHandleTheme } = useTheme();

  return (
    <Switch
      className="data-[state=checked]:bg-sky-600 data-[state=checked]:dark:bg-sky-900"
      checked={theme === "dark" || theme === "system"}
      onCheckedChange={() =>
        onHandleTheme(theme === "light" ? "dark" : "light")
      }
    />
  );
};
