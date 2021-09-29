import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ThemeTypings,
  Image,
} from "@chakra-ui/react";
import React from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: ThemeTypings["components"]["Modal"]["sizes"];
  image: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  size = "full",
  image,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent bgColor="#333">
        <ModalHeader>
          <Heading textTransform="uppercase">Image Preview</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={image} h="100%" maxH="90vh" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
