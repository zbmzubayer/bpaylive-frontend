"use client";

import { Logout } from "@/components/auth";
import { ToggleTheme } from "@/components/toggle-theme";
import { DASHBOARD_SIDEBAR_ITEMS } from "@/constants";
import { Button } from "@heroui/button";
import { Drawer, DrawerBody, DrawerContent } from "@heroui/drawer";
import { useDisclosure } from "@heroui/modal";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export default function DashboardDrawer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data } = useSession();

  return (
    <>
      <Button isIconOnly size="sm" className="bg-transparent text-white sm:hidden" onPress={onOpen}>
        <FaBars className="size-5" />
        <span className="sr-only">Menu open</span>
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="full"
        classNames={{
          closeButton: "top-7 right-7",
        }}
      >
        <DrawerContent>
          <>
            <DrawerBody className="bg-background">
              <aside className="w-3/4">
                <div className="flex h-full w-full flex-col">
                  <ToggleTheme size="sm" className="w-full rounded-lg" />
                  <div className="my-3 flex items-center gap-1 rounded-lg bg-default px-3 py-2 text-sm font-medium text-foreground">
                    <FaUserCircle className="size-5" />
                    <p>{data?.user.username}</p>
                  </div>
                  <nav>
                    <ul className="text-sm">
                      {DASHBOARD_SIDEBAR_ITEMS.map((item) => (
                        <li key={item.title}>
                          <Link
                            href={item.href}
                            className="inline-block w-full rounded-md px-3 py-2 hover:bg-default"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <Logout className="mb-5 mt-auto w-full font-medium text-danger">
                    <MdLogout className="size-4" />
                    Logout
                  </Logout>
                </div>
              </aside>
            </DrawerBody>
          </>
        </DrawerContent>
      </Drawer>
    </>
  );
}
