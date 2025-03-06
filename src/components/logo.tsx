"use client";

import { cn } from "@heroui/react";
import { useTheme } from "next-themes";
import Image, { type ImageProps } from "next/image";
import { useMemo } from "react";

type LogoProps = Omit<ImageProps, "src" | "alt">;

export function Logo({ className, ...props }: LogoProps) {
  const { theme } = useTheme();

  const src = useMemo(() => {
    if (theme === "dark") {
      return "/BetPay24-bg-black.svg";
    } else if (theme === "light") {
      return "/BetPay24-bg-white.svg";
    } else if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "/BetPay24-bg-black.svg";
    } else {
      return "/BetPay24-bg-white.svg";
    }
  }, [theme]);

  if (!theme) return null;

  return (
    <Image
      src={src}
      alt="BetPay24 Logo"
      width={props.width ?? 200}
      height={props.height ?? 200}
      className={cn("mx-auto size-32", className)}
      {...props}
    />
  );
}
