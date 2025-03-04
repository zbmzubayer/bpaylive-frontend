"use client";

import { Button, ButtonProps } from "@heroui/button";
import { signOut } from "next-auth/react";

export function Logout({ children, ...props }: ButtonProps) {
  return (
    <Button {...props} onPress={async () => await signOut({ callbackUrl: "/admin" })}>
      {children}
    </Button>
  );
}
