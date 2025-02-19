import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <img
        src={`https://localhost:3000/depix.png`}
        alt="icon"
        width={32}
        height={32}
      />
    ),
    {
      ...size,
    },
  );
}
