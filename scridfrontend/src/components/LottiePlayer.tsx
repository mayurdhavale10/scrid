"use client";

import { Player } from "@lottiefiles/react-lottie-player";

export default function LottiePlayer({
  src,
  style = { height: "100px", width: "100px" },
  loop = true,
  autoplay = true,
}: {
  src: string;
  style?: React.CSSProperties;
  loop?: boolean;
  autoplay?: boolean;
}) {
  return <Player autoplay={autoplay} loop={loop} src={src} style={style} />;
}
