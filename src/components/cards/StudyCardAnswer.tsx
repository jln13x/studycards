import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import React from "react";
import { ImageWrapper } from "../ImageWrapper";
import { Markdown } from "../Markdown";

interface StudyCardAnswerProps {
  answer: string;
  showQuestion: () => void;
  images: string[];
}

export const StudyCardAnswer: React.FC<StudyCardAnswerProps> = ({
  answer,
  showQuestion,
  images,
}) => {
  return (
    <>
      <Flex
        w="100%"
        flexDir="column"
        flexGrow={1}
        my={8}
        overflowY={"scroll"}
        wordBreak="break-all"
        pr={{
          base: "4",
          "2xl": "12",
        }}
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
        <Markdown markdown={answer} />
      </Flex>

      <Box h="15%" w="100%">
        <ImageWrapper images={images} />
      </Box>

      <Button
        textTransform="uppercase"
        variant="outline"
        onClick={showQuestion}
        mt={8}
        minH="5%"
      >
        Show question
      </Button>
    </>
  );
};
