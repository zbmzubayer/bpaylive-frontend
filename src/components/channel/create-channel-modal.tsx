"use client";

import { FaCirclePlus } from "react-icons/fa6";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/modal";
import { CreateChannelForm } from "@/components/channel/create-channel-form";

export function CreateChannelModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} className="font-medium">
        <FaCirclePlus className="size-4" />
        Create channel
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg uppercase">Create New Channel</ModalHeader>
              <ModalBody className="pb-4">
                <CreateChannelForm onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
