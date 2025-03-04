"use client";

import { FaCirclePlus } from "react-icons/fa6";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/modal";
import { CreateSportForm } from "@/components/sport/create-sport-form";

export function CreateSportModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} className="font-medium">
        <FaCirclePlus className="size-4" />
        Create sport
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg uppercase">Create New Sport</ModalHeader>
              <ModalBody className="pb-4">
                <CreateSportForm onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
