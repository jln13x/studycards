import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { Markdown } from "../Markdown";

interface StudyCardQuestionProps {
  question: string;
  showAnswer: () => void;
}

export const StudyCardQuestion: React.FC<StudyCardQuestionProps> = ({
  question,
  showAnswer,
}) => {
  return (
    <>
      <Flex
        fontSize={{
          base: "large",
          "2xl": "xx-large",
        }}
        flexGrow={1}
        w="100%"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Markdown markdown={question} />
      </Flex>
      <Button
        textTransform="uppercase"
        variant="outline"
        onClick={showAnswer}
        minH="5%"
      >
        Show answer
      </Button>
    </>
  );
};
