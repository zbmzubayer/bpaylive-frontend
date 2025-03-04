"use client";

import { FaPen } from "react-icons/fa6";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/modal";
import { Sport } from "@/types";
import { EditSportForm } from "@/components/sport/edit-sport-form";

export function EditSportModal({ sport }: { sport: Sport }) {
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
              <ModalHeader className="text-lg uppercase">Edit Sport</ModalHeader>
              <ModalBody className="pb-4">
                <EditSportForm sport={sport} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
