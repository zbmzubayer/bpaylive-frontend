"use client";

import CreateUserForm from "@/components/user/create-user-form";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/modal";
import { FaCirclePlus } from "react-icons/fa6";

export function CreateUserModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} className="font-medium">
        <FaCirclePlus className="size-4" />
        Create user
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg uppercase">Create New User</ModalHeader>
              <ModalBody className="pb-4">
                <CreateUserForm onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
