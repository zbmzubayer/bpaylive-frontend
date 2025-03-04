"use client";

import { FaPen } from "react-icons/fa6";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/modal";
import { User } from "@/types";
import EditUserForm from "@/components/user/edit-user-form";

export function EditUserModal({ user }: { user: User }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} isIconOnly color="warning" size="sm">
        <FaPen className="size-4" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg uppercase">Edit User</ModalHeader>
              <ModalBody className="pb-4">
                <EditUserForm user={user} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
