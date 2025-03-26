"use client";

import { FaCirclePlus } from "react-icons/fa6";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/modal";
import { CreateMatchForm } from "@/components/match/create-match-form";

export function CreateMatchModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} className="font-medium">
        <FaCirclePlus className="size-4" />
        Create match
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg uppercase">Create New Match</ModalHeader>
              <ModalBody className="pb-4">
                <CreateMatchForm onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
