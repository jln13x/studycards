import { Box, Image, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { ImageModal } from "./ImageModal";

interface UploadedImageProps {
  image: string;
}

export const UploadedImage: React.FC<UploadedImageProps> = ({ image }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box
      height="100%"
      minHeight="0"
      minWidth="0"
      background="red.600"
      display="flex"
      justifyContent="center"
    >
      <Image
        src={image}
        h="100%"
        flexGrow={1}
        _hover={{
          transition: "0.2s ease-in-out",
          opacity: "0.8",
        }}
        onClick={onOpen}
      />
      <ImageModal isOpen={isOpen} onClose={onClose} image={image} />
    </Box>
  );
};
