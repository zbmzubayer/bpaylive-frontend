"use client";

import { useTheme } from "next-themes";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { MdLightMode } from "react-icons/md";
import { RiMoonClearFill } from "react-icons/ri";

import { Button, type ButtonProps } from "@heroui/button";
import { cn } from "@heroui/theme";

type ToggleThemeProps = ButtonProps & {
  classNames?: Partial<Record<"wrapper" | "button" | "icon", string>>;
};

export function ToggleTheme({ classNames, className, ...props }: ToggleThemeProps) {
  const { theme, setTheme } = useTheme();
  if (!theme) return null;

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-[0.625rem] border border-zinc-600 p-0.5 *:text-zinc-600 *:dark:text-zinc-300",
        classNames?.wrapper
      )}
    >
      <Button
        aria-label="Light theme"
        radius="md"
        // isIconOnly
        onPress={() => setTheme("light")}
        className={cn(
          "bg-transparent",
          theme === "light" && "bg-default *:text-yellow-500",
          className
        )}
        {...props}
      >
        <MdLightMode className={cn("size-5")} />
        <span className="sr-only">Light theme</span>
      </Button>
      <Button
        aria-label="System theme"
        radius="md"
        // isIconOnly
        onPress={() => setTheme("system")}
        className={cn("bg-transparent", theme === "system" && "bg-default", className)}
        {...props}
      >
        <HiMiniComputerDesktop className="size-5" />
        <span className="sr-only">System theme</span>
      </Button>
      <Button
        aria-label="Dark theme"
        radius="md"
        // isIconOnly
        onPress={() => setTheme("dark")}
        className={cn(
          "bg-transparent",
          theme === "dark" && "bg-default *:text-neutral-900",
          className
        )}
        {...props}
      >
        <RiMoonClearFill className="size-5" />
        <span className="sr-only">Dark theme</span>
      </Button>
    </div>
  );
}
