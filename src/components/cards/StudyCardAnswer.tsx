import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { Markdown } from "../Markdown";

interface StudyCardAnswerProps {
  answer: string;
  showQuestion: () => void;
}

export const StudyCardAnswer: React.FC<StudyCardAnswerProps> = ({
  answer,
  showQuestion,
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

      <Button
        textTransform="uppercase"
        variant="outline"
        onClick={showQuestion}
      >
        Show question
      </Button>
    </>
  );
};
