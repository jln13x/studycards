import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FieldArray } from "formik";
import React, { useRef } from "react";
import { FaTrash } from "react-icons/fa";
import { toBase64 } from "../utils/toBase64";
import { ImageModal } from "./ImageModal";

interface ImageUploadFieldProps {
  data: string[];
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const uploadWrapper = useRef<HTMLDivElement>(null);

  const imageRef = useRef<string>();

  const showImagePreview = (image: string)  => {
    imageRef.current = image;
    onOpen();
  }

  return (
    <FieldArray name="images">
      {({ remove, push }) => (
        <Grid
          ref={uploadWrapper}
          gridTemplateColumns="repeat(4, 1fr)"
          gap={4}
          padding={4}
          width="100%"
          border="2px dotted"
          tabIndex={-1}
          onPaste={async (e) => {
            const file = e.clipboardData.files[0];

            if (file && file.type.includes("image")) {
              const b64 = await toBase64(file);
              push(b64);
            }
          }}
          _focus={{
            borderColor: "red.800",
          }}
          gridRowGap={2}
        >
          {data.length ? (
            data.map((image, idx) => (
              <Flex
                key={`${image}${idx}`}
                position="relative"
                maxH="10vh"
                h="10vh"
                p={2}
                bg="blackAlpha.400"
              >
                <Box bg="red.800">
                  <Image
                    src={image}
                    maxH="100%"
                    flexGrow={0}
                    onClick={() => showImagePreview(image)}
                    _hover={{
                      transition: "0.2s ease-in-out",
                      opacity: "0.8",
                    }}
                  />
                </Box>
                <Button
                  variant="solid"
                  position="absolute"
                  top="2"
                  right="2"
                  onClick={(e) => {
                    uploadWrapper.current?.focus();
                    remove(idx);
                  }}
                  size="xs"
                  background="red.800"
                  _focus={{ borderColor: "none" }}
                >
                  <Icon as={FaTrash} />
                </Button>
                <ImageModal isOpen={isOpen} onClose={onClose} image={imageRef.current || ''} />
              </Flex>
            ))
          ) : (
            <Text
              fontSize="large"
              textTransform="uppercase"
              textAlign="center"
              w="100%"
            >
              Paste your images here
            </Text>
          )}
        </Grid>
      )}
    </FieldArray>
  );
};
