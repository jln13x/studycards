import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  useBoolean,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { Card } from "../../interfaces/Card";
import { IndexModifier } from "../../pages/Study";
import { EDIT_CARD_PATH_NAME } from "./EditCardModal";
import { StudyCardAnswer } from "./StudyCardAnswer";
import { StudyCardNavigation } from "./StudyCardNavigation";
import { StudyCardQuestion } from "./StudyCardQuestion";
import { Tags } from "./Tag";

interface StudyCardProps {
  card: Card;
  indexModifier: IndexModifier;
}

export const StudyCard: React.FC<StudyCardProps> = ({
  card,
  indexModifier,
}) => {
  const { title, question, answer, tags } = card;

  const { pathname: currentLocation } = useLocation();

  const { path: basePath } = useRouteMatch();

  const swipeHandler = useSwipeable({
    onSwipedLeft: () => {
      showQuestion();
      decrement();
    },
    onSwipedRight: () => {
      showQuestion();
      increment();
    },
  });

  const keyboardHandler = useRef<HTMLDivElement | null>(null);

  const [
    answerIsShowing,
    {
      off: showQuestion,
      on: showAnswer,
      toggle: toggleBetweenQuestionAndAnswer,
    },
  ] = useBoolean();

  const { decrement, increment, isFirstIndex, isLastIndex } = indexModifier;

  const handleKeyboardAccessibility = (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    switch (e.code) {
      case "Space":
        toggleBetweenQuestionAndAnswer();
        break;

      case "ArrowLeft":
      case "KeyA":
        showQuestion();
        decrement();
        break;

      case "ArrowRight":
      case "KeyD":
        showQuestion();
        increment();
        break;
    }
  };

  useEffect(() => {
    currentLocation === basePath &&
      keyboardHandler.current &&
      keyboardHandler.current.focus();
  }, [keyboardHandler, currentLocation, basePath, card, indexModifier]);


  return (
    <HStack
      spacing={{
        base: 0,
        lg: 4,
      }}
      height="100%"
      width="100%"
      ref={keyboardHandler}
    >
      <Flex
        justifyContent="center"
        display={{
          base: "none",
          lg: "block",
        }}
      >
        <StudyCardNavigation
          onClick={decrement}
          disabled={isFirstIndex}
          direction="left"
        />
      </Flex>

      <Flex
        flexGrow={1}
        py={{
          base: 2,
          "2xl": 4,
        }}
        px={{
          base: 4,
          "2xl": 12,
        }}
        bgColor="red.800"
        rounded={8}
        justifyContent="center"
        alignItems="center"
        height="100%"
        flexDir="column"
        onKeyDown={(e) => handleKeyboardAccessibility(e)}
        tabIndex={0}
        _focusVisible={{ outline: "none" }}
        // ref={StudyCardRef}
        {...swipeHandler}
      >
        <Flex
          alignSelf="flex-start"
          justifyContent="space-between"
          width="100%"
        >
          <Box flexGrow={1}>
            <Heading>{title}</Heading>
            <Tags tags={tags} />
          </Box>
          <Button
            as={Link}
            to={`/study${EDIT_CARD_PATH_NAME.replace(":id", "" + card._id)}`}
          >
            <Icon as={FaEdit} />
          </Button>
        </Flex>

        {answerIsShowing ? (
          <>
            <StudyCardAnswer answer={answer} showQuestion={showQuestion} />
          </>
        ) : (
          <>
            <StudyCardQuestion question={question} showAnswer={showAnswer} />
          </>
        )}
      </Flex>

      <Flex
        justifyContent="center"
        display={{
          base: "none",
          lg: "block",
        }}
      >
        <StudyCardNavigation
          onClick={increment}
          disabled={isLastIndex}
          direction="right"
        />
      </Flex>
    </HStack>
  );
};
