import { FaTrash } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { SPORT_KEY } from "@/constants/query-key";
import { getQueryClient } from "@/lib";
import { deleteSport } from "@/services";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";

export function DeleteSportModal({ id }: { id: string }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const queryClient = getQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => deleteSport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SPORT_KEY] });
      onClose();
      addToast({
        title: "Success",
        description: "Sport has been deleted successfully",
        color: "success",
      });
    },
    onError: () => {
      addToast({
        title: "Error",
        description: "Failed to delete sport",
        color: "danger",
      });
    },
  });

  const handleDelete = async () => {
    await mutateAsync();
  };

  return (
    <>
      <Button isIconOnly color="danger" size="sm" onPress={onOpen}>
        <FaTrash className="size-4" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader>Are you sure to delete this sport?</ModalHeader>
            <ModalBody>
              <p>This action can not be undone.</p>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose}>Cancel</Button>
              <Button
                color="danger"
                onPress={handleDelete}
                isLoading={isPending}
                isDisabled={isPending}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
