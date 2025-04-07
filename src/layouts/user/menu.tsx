"use client";

import Image from "next/image";
import { FaBars } from "react-icons/fa6";
import { useQueries } from "@tanstack/react-query";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/drawer";
import { useDisclosure } from "@heroui/modal";
import { ENV_CLIENT } from "@/config";
import { CHANNEL_KEY, SPORT_KEY } from "@/constants/query-key";
import { getAllChannel, getAllSport } from "@/services";
import { Logo } from "@/components/logo";

export default function MenuDrawer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [{ data: sportData }, { data: channelData }] = useQueries({
    queries: [
      { queryKey: [SPORT_KEY], queryFn: getAllSport },
      { queryKey: [CHANNEL_KEY], queryFn: getAllChannel },
    ],
  });

  const sports = sportData?.data.map((sport) => ({
    ...sport,
    icon: `${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${sport.icon}`,
  }));
  const channels = channelData?.data.map((channel) => ({
    ...channel,
    icon: `${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${channel.icon}`,
  }));

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
            <DrawerHeader className="bg-background">
              <Logo className="size-20" />
            </DrawerHeader>
            <DrawerBody className="bg-background">
              <Accordion
                itemClasses={{
                  title: "text-white",
                  content: "text-white",
                  trigger: "rounded-md px-3 py-2",
                }}
              >
                <AccordionItem key="sports" aria-label="Sports" title="Sports">
                  <ul>
                    {sports?.map((item) => (
                      <li key={item.id} className="my-1 rounded-md border border-border px-3 py-2">
                        <Image
                          src={item.icon}
                          alt={item.name}
                          width={20}
                          height={20}
                          crossOrigin="anonymous"
                          className="mr-2 inline-block size-4 rounded-sm bg-white"
                        />
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
                <AccordionItem key="channels" aria-label="Channels" title="Channels">
                  <ul>
                    {channels?.map((item) => (
                      <li key={item.id} className="my-1">
                        <a
                          href={`/channel/${item.id}`}
                          className="inline-flex w-full items-center rounded-md border border-border px-3 py-2"
                        >
                          <Image
                            src={item.icon as string}
                            alt={item.title}
                            width={20}
                            height={20}
                            crossOrigin="anonymous"
                            className="mr-2 inline-block size-4 rounded-sm bg-white"
                          />
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              </Accordion>
            </DrawerBody>
          </>
        </DrawerContent>
      </Drawer>
    </>
  );
}
