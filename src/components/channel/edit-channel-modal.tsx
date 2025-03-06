"use client";

import { FaPen } from "react-icons/fa6";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/modal";
import { ChannelWithSports } from "@/types";
import { EditChannelForm } from "@/components/channel/edit-channel-form";

export function EditChannelModal({ channel }: { channel: ChannelWithSports }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} isIconOnly color="warning" size="sm">
        <FaPen className="size-4" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg uppercase">Edit Channel</ModalHeader>
              <ModalBody className="pb-4">
                <EditChannelForm channel={channel} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
