import { cn } from "@heroui/react";
import { useTheme } from "next-themes";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { useMemo } from "react";

type LogoProps = Omit<ImageProps, "src" | "alt">;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <Link href="/">
      <Image
        src="/BetPay24-bg-black.svg"
        priority
        alt="BetPay24 Logo"
        width={props.width ?? 200}
        height={props.height ?? 200}
        className={cn("size-32", className)}
        {...props}
      />
    </Link>
  );
}
