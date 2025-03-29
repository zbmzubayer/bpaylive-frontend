import Link from "next/link";
import Image, { type ImageProps } from "next/image";
import { cn } from "@heroui/react";

type LogoProps = Omit<ImageProps, "src" | "alt">;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <Link href="/">
      <Image
        src="/BetPay24-bg-black.svg"
        priority
        alt="BetPayLive Logo"
        width={props.width ?? 200}
        height={props.height ?? 200}
        className={cn("size-32", className)}
        {...props}
      />
    </Link>
  );
}
