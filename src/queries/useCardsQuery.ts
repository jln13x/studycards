import { preConfiguredAxios as axios } from "../utils/preconfiguredAxios";
import { useQuery, UseQueryResult } from "react-query";
import { Card } from "../interfaces/Card";

export const CARDS_QUERY_KEY = "cards/study";
const QUERY_PATH = "/cards";

export const useCardsQuery = <TData = Card>(
  search = ""
): UseQueryResult<TData[], unknown> => {
  return useQuery<TData[], unknown, TData[]>([CARDS_QUERY_KEY, search], {
    queryFn: async () => {
      const response = await axios.get(QUERY_PATH, {
        params: {
          search,
        },
      });
      return response.data;
    },
  });
};
