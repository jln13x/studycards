import { preConfiguredAxios as axios } from "../utils/preconfiguredAxios";
import { useQuery } from "react-query";
import { Card } from "../interfaces/Card";

export const CARDS_QUERY_KEY = "cards";
const QUERY_PATH = "/cards";

export const useCardsQuery = (search: string = '') => {
  return useQuery<Card[], unknown, Card[]>([CARDS_QUERY_KEY, search], {
    queryFn: async () => {
      const response = await axios.get(QUERY_PATH, {
        params: {
          search: search
        }
      });
      return response.data;
    },
  });
};
