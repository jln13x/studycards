import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import React from "react";

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
        fontSize="xx-large"
        flexGrow={1}
        w="100%"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* <Markdown markdown={question} /> */}
        {question}
      </Flex>

      <Button textTransform="uppercase" variant="outline" onClick={showAnswer}>
        Show answer
      </Button>
    </>
  );
};
