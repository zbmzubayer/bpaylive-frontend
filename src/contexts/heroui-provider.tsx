"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";

export function HeroUiProvider({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  );
}
