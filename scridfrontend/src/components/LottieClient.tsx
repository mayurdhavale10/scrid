"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

type Props = {
  autoplay?: boolean;
  loop?: boolean;
  src: string;
  style?: React.CSSProperties;
};

const LottieClient: React.FC<Props> = ({ autoplay = true, loop = true, src, style }) => {
  return (
    <Player
      autoplay={autoplay}
      loop={loop}
      src={src}
      style={style}
    />
  );
};

export default LottieClient;
