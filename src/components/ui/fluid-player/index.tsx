"use client";

import fluidPlayer from "fluid-player";
import { useEffect, useRef } from "react";
import "./player.css";

interface FluidPlayerProps {
  url: string;
  title: string;
  type: string;
}

export function FluidPlayer({ url, title, type }: FluidPlayerProps) {
  const self = useRef<HTMLVideoElement | null>(null);
  const player = useRef<FluidPlayerInstance | null>(null);

  useEffect(() => {
    if (!player.current) {
      player.current = fluidPlayer(self.current as HTMLVideoElement, {
        layoutControls: {
          fillToContainer: true,
          autoPlay: true,
        },
      });
    }
  }, []);

  return (
    <div>
      <video ref={self}>
        <source src={url} title={title} type={type} />
      </video>
    </div>
  );
}
