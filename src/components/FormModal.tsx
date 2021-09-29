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
import { useFormikContext } from "formik";
import React from "react";
import { useHistory } from "react-router";

interface CustomModalProps {
  exact?: boolean;
  size?: ThemeTypings["components"]["Modal"]["sizes"];
  title: string;
  footer?: React.ReactNode;
  wrapper?: any;
}

export const FormModal: React.FC<CustomModalProps> = ({
  children,
  footer,
  size = "6xl",
  title,
  wrapper,
}) => {
  const formik = useFormikContext();

  const { goBack } = useHistory();

  return (
    <Modal isOpen={true} size={size} onClose={goBack}>
      <form {...formik}>
        <ModalOverlay />
        <ModalContent bgColor="#333">
          <ModalHeader>
            <Heading textTransform="uppercase">{title}</Heading>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>{footer}</ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
