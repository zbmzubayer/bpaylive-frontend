"use client";

import { FaPen } from "react-icons/fa6";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/modal";
import { MatchWithSportAndChannel } from "@/types";
import { EditMatchForm } from "@/components/match/edit-match-form";

export function EditMatchModal({ match }: { match: MatchWithSportAndChannel }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} isIconOnly color="warning" size="sm">
        <FaPen className="size-4" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg uppercase">Edit Match</ModalHeader>
              <ModalBody className="pb-4">
                <EditMatchForm match={match} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
