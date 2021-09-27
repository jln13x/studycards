import { CheckCircleIcon } from "@chakra-ui/icons";
import { Button, Flex, Spinner, useBoolean } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { AlertError } from "../components/Alert";
import {
  EditCardModal,
  EDIT_CARD_PATH_NAME,
} from "../components/cards/EditCardModal";
import { StudyCard } from "../components/cards/StudyCard";
import { useCardsQuery } from "../queries/useCardsQuery";
import { getRandomNumber } from "../utils/getRandomNumber";

export interface IndexModifier {
  current: number;
  last: number | undefined;
  isLastIndex: boolean;
  isFirstIndex: boolean;
  increment: () => void;
  decrement: () => void;
  setCardIndex: React.Dispatch<React.SetStateAction<number>>;
}

const LOCAL_STORAGE_KEY = "study-card-index";

export const Study: React.FC = () => {
  const [cardIndex, setCardIndex] = useState(0);
  console.log("oben", cardIndex);

  const { data, isLoading } = useCardsQuery();

  const lastPages = useRef<number[]>([]);

  const [shuffleActive, { toggle: toggleShuffle }] = useBoolean();

  const { path } = useRouteMatch();

  console.log(lastPages);

  const isFirstIndex =
    cardIndex === 0 || (shuffleActive && !lastPages.current.length);

  const lastIndex = data && data.length - 1;
  const currentCard = data && data[cardIndex];
  const isLastIndex = cardIndex === lastIndex && !shuffleActive;

  const incrementIndex = () => {
    if (shuffleActive) {
      lastIndex && setCardIndex(getRandomNumber(lastIndex));
      lastPages.current.push(cardIndex);
      return;
    }

    if (!isLastIndex) {
      setCardIndex((currentIndex) => currentIndex + 1);
      lastPages.current.push(cardIndex);
    }
  };

  const decrementIndex = () => {
    setCardIndex((currentIndex) => {
      if (shuffleActive) {
        const lastPage = lastPages.current.pop();

        if (lastPage) {
          return lastPage;
        }
      }

      if (!isFirstIndex) {
        return currentIndex - 1;
      }

      return currentIndex;
    });
  };

  useEffect(() => {
    const itemFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (itemFromLocalStorage) {
      setCardIndex(parseInt(itemFromLocalStorage));
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, "" + cardIndex);
  }, [cardIndex]);

  useEffect(() => {
    // data && cardIndex >= data.length && setCardIndex(0);
  }, [cardIndex, data]);

  const indexModifier: IndexModifier = {
    current: cardIndex,
    last: lastIndex,
    isFirstIndex,
    isLastIndex,
    increment: incrementIndex,
    decrement: decrementIndex,
    setCardIndex,
  };

  return (
    <>
      <Route path={`${path}`}>
        <Flex
          padding={{
            base: "2",
            "2xl": "12",
          }}
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          {isLoading ? (
            <Spinner size="xl" />
          ) : data?.length ? (
            <Flex flexGrow={1} height="100%" flexDir="column">
              {/* Settings  */}
              <Flex mb={2} justifyContent="flex-end">
                <Button
                  leftIcon={shuffleActive ? <CheckCircleIcon /> : undefined}
                  size="md"
                  variant="outline"
                  onClick={toggleShuffle}
                  isActive={shuffleActive}
                  _active={{ bg: "green" }}
                >
                  Shuffle
                </Button>
              </Flex>
              {/* Card */}
              {currentCard && (
                <StudyCard
                  card={currentCard}
                  indexModifier={indexModifier}
                  key={currentCard._id}
                />
              )}
            </Flex>
          ) : (
            <AlertError msg="No cards found!" />
          )}
        </Flex>
      </Route>

      <Route path={`${path}${EDIT_CARD_PATH_NAME}`}>
        <EditCardModal />
      </Route>
    </>
  );
};
