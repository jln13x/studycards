import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";
import { Card } from "../interfaces/Card";
import { preConfiguredAxios as axios } from "../utils/preconfiguredAxios";

export const INFINITE_CARDS_QUERY_KEY = "cards";
const QUERY_PATH = "/cards/overview";

interface InfinteCardsMetaData {
  totalPages: string;
  nextPage: number | null;
  currentPage: number;
  search: string;
}

export interface InfiniteCardsData {
  metadata: InfinteCardsMetaData;
  data: Card[];
}

export const useInfiniteCardsQuery = (
  search = ""
): UseInfiniteQueryResult<InfiniteCardsData> => {
  return useInfiniteQuery<InfiniteCardsData>(
    [INFINITE_CARDS_QUERY_KEY, search],
    async ({ pageParam: page = 0 }) => {
      const response = await axios.get("/cards/overview", {
        params: {
          search,
          page,
        },
      });
      return response.data;
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.metadata.nextPage;
      },
    }
  );
};
