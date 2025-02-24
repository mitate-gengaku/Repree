import { useSyncExternalStore } from "react";

const isTouchDevice = (): boolean => {
  return (
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );
};

export const useIsTouchDevice = () =>
  useSyncExternalStore(
    () => () => {},
    isTouchDevice,
    () => false,
  );
