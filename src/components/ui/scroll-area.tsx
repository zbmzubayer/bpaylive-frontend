"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@heroui/theme";

interface ScrollAreaProps extends React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.Root> {
  classNames?: Partial<Record<"root" | "viewport" | "hbar" | "vbar" | "thumb" | "corner", string>>;
  horizontal?: boolean;
  vertical?: boolean;
}
/**
 * @see {@link https://www.radix-ui.com/primitives/docs/components/scroll-area}
 * @anatomy
 * ```tsx
 * <ScrollArea.Root classNames={{root: "", viewport: "", hbar: "", vbar: "", thumb: "", corner: ""}}>
 *   <ScrollArea.Viewport />
 *   <ScrollArea.Scrollbar orientation="horizontal">
 *     <ScrollArea.Thumb />
 *   </ScrollArea.Scrollbar>
 *   <ScrollArea.Scrollbar orientation="vertical">
 *     <ScrollArea.Thumb />
 *   </ScrollArea.Scrollbar>
 *   <ScrollArea.Corner />
 * </ScrollArea.Root>
 */
const ScrollArea = ({
  ref,
  children,
  className,
  horizontal = true,
  vertical = true,
  classNames,
  ...props
}: ScrollAreaProps) => (
  <ScrollAreaPrimitive.Root ref={ref} className={cn("overflow-hidden", className)} {...props}>
    <ScrollAreaPrimitive.Viewport
      className={cn("size-full rounded-[inherit]", classNames?.viewport)}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    {horizontal && (
      <ScrollAreaPrimitive.ScrollAreaScrollbar
        orientation="horizontal"
        className={cn(
          "flex h-2.5 touch-none select-none rounded-full bg-default transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:flex-col",
          classNames?.hbar
        )}
      >
        <ScrollAreaPrimitive.ScrollAreaThumb
          className={cn(
            "relative flex-1 rounded-[10px] bg-neutral-400 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2 hover:bg-neutral-500 dark:hover:bg-neutral-300",
            classNames?.thumb
          )}
        />
      </ScrollAreaPrimitive.ScrollAreaScrollbar>
    )}
    {vertical && (
      <ScrollAreaPrimitive.ScrollAreaScrollbar
        orientation="vertical"
        className={cn(
          "flex w-2.5 touch-none select-none rounded-full bg-default transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:flex-col",
          classNames?.vbar
        )}
      >
        <ScrollAreaPrimitive.ScrollAreaThumb
          className={cn(
            "relative flex-1 rounded-[10px] bg-neutral-400 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2 hover:bg-neutral-500 dark:hover:bg-neutral-300",
            classNames?.thumb
          )}
        />
      </ScrollAreaPrimitive.ScrollAreaScrollbar>
    )}
    <ScrollAreaPrimitive.Corner className={cn(classNames?.corner)} />
  </ScrollAreaPrimitive.Root>
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

export { ScrollArea };
