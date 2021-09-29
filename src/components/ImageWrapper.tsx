import { Flex } from "@chakra-ui/react";
import React from "react";
import { UploadedImage } from "./UploadedImage";
interface ImageWrapperProps {
  images: string[];
}

export const ImageWrapper: React.FC<ImageWrapperProps> = ({ images }) => {
  return (
    <Flex
      h="100%"
      gridGap={2}
      w="100%"
      flexWrap="wrap"
      py={4}
      overflowY="scroll"
      sx={{
        "::-webkit-scrollbar": {
          width: "4",
        },
        "::-webkit-scrollbar-thumb": {
          background: "blackAlpha.500",
          borderRadius: "16",
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "blackAlpha.600",
        },
      }}
    >
      {images.map((image, idx) => (
        <UploadedImage image={image} key={`${image}${idx}`} />
      ))}
    </Flex>
  );
};
