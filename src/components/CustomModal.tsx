import {
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ThemeTypings,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";

interface CustomModalProps {
  exact?: boolean;
  size?: ThemeTypings["components"]["Modal"]["sizes"];
  title: string;
  footer?: React.ReactNode;
  wrapper?: any;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  children,
  footer,
  size = "6xl",
  title,
  wrapper,
}) => {
  const { goBack } = useHistory();
  const Wrapper = wrapper || Box;

  return (
    <Modal isOpen={true} size={size} onClose={goBack} closeOnOverlayClick={false}>
      <Wrapper>
        <ModalOverlay />
        <ModalContent bgColor="#333">
          <ModalHeader>
            <Heading textTransform="uppercase">{title}</Heading>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>{footer}</ModalFooter>
        </ModalContent>
      </Wrapper>
    </Modal>
  );
};
