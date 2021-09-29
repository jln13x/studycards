import { useState } from "react";
import { shuffleArray } from "../utils/shuffleArray";

export const useShuffle = () => {
  const [shuffledData, setShuffledData] = useState<any[] | undefined>(
    undefined
  );

  const shuffle = (data: any[]) => {
    setShuffledData(shuffleArray(data));
  };

  const reshuffle = () => {
    shuffledData && shuffle(shuffledData);
  };

  return { shuffledData, shuffle, reshuffle };
};
