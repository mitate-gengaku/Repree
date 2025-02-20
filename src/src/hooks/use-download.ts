"use client";

import {
  getNodesBounds,
  getViewportForBounds,
  useReactFlow,
} from "@xyflow/react";
import { toSvg } from "html-to-image";

import { downloadImage } from "@/lib/download-image";

export const useDownload = () => {
  const { getNodes } = useReactFlow();
  const imageWidth = 1024;
  const imageHeight = 768;

  const onDownloadImage = () => {
    const element = document.querySelector<HTMLElement>(
      ".react-flow__viewport",
    );

    if (!element) return;

    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
      0,
    );

    toSvg(element, {
      backgroundColor: "#1a365d",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth.toString(),
        height: imageHeight.toString(),
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downloadImage);
  };

  return {
    onDownloadImage,
  };
};
