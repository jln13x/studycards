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

export interface ShuffleModifier {
  shuffleActive: boolean;
  toggleShuffle: () => void;
}

const LOCAL_STORAGE_KEY = "study-card-index";

export const Study: React.FC = () => {
  const [cardIndex, setCardIndex] = useState(0);

  const { data, isLoading } = useCardsQuery();

  const lastPages = useRef<number[]>([]);

  const [shuffleActive, { toggle: toggleShuffle }] = useBoolean();

  const { path } = useRouteMatch();

  const isFirstIndex =
    cardIndex === 0 || (shuffleActive && !lastPages.current.length);

  const lastIndex = data && data.length - 1;
  const currentCard = data && data[cardIndex];

  const isLastIndex = cardIndex === lastIndex && !shuffleActive;

  const incrementIndex = () => {
    if (shuffleActive) {
      lastPages.current.push(cardIndex);
      lastIndex && setCardIndex(getRandomNumber(lastIndex));
      return;
    }

    if (!isLastIndex) {
      setCardIndex((currentIndex) => currentIndex + 1);
    }
  };

  const decrementIndex = () => {
    if (shuffleActive) {
      const lastPage = lastPages.current.pop();
      if (lastPage !== undefined) setCardIndex(lastPage);
      return;
    }

    if (!isFirstIndex) {
      setCardIndex((currentCardIndex) => currentCardIndex - 1);
    }
  };

  useEffect(() => {
    const itemFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (itemFromLocalStorage) {
      setCardIndex(parseInt(itemFromLocalStorage));
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, `${cardIndex}`);
  }, [cardIndex]);

  const reset = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setCardIndex(0);
  }

  const indexModifier: IndexModifier = {
    current: cardIndex,
    last: lastIndex,
    isFirstIndex,
    isLastIndex,
    increment: incrementIndex,
    decrement: decrementIndex,
    setCardIndex,
  };

  const shuffleModifier: ShuffleModifier = {
    shuffleActive,
    toggleShuffle,
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
              <Flex mb={2} justifyContent="center"></Flex>
              {/* Card */}
              {currentCard ? (
                <StudyCard
                  card={currentCard}
                  indexModifier={indexModifier}
                  shuffleModifier={shuffleModifier}
                  key={currentCard._id}
                />
              ) : (
                <AlertError>
                  <Button colorSchema="red" onClick={reset}>Reset?</Button>
                </AlertError>
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
