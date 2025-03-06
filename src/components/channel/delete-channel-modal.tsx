"use client";

import { useMutation } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa6";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { CHANNEL_KEY } from "@/constants/query-key";
import { getQueryClient } from "@/lib";
import { deleteChannel } from "@/services";
import { addToast } from "@heroui/toast";

export function DeleteChannelModal({ id }: { id: string }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const queryClient = getQueryClient();

  const { mutateAsync: deleteItem, isPending } = useMutation({
    mutationFn: deleteChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CHANNEL_KEY] });
      onClose();
      addToast({
        title: "Success",
        description: "Channel has been deleted successfully",
        color: "success",
      });
    },
    onError: () => {
      addToast({
        title: "Error",
        description: "Failed to delete channel",
        color: "danger",
      });
    },
  });

  const onDelete = async () => {
    await deleteItem(id);
  };

  return (
    <>
      <Button onPress={onOpen} isIconOnly color="danger" size="sm">
        <FaTrash className="size-4" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="text-lg">Are you sure you want to delete this channel?</p>
              </ModalHeader>
              <ModalBody>
                <p className="text-base text-default-500">
                  This action cannot be undone. This will permanently delete this channel.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Cancel</Button>
                <Button
                  color="danger"
                  isLoading={isPending}
                  isDisabled={isPending}
                  onPress={onDelete}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
