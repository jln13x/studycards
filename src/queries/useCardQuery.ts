import { preConfiguredAxios as axios } from "../utils/preconfiguredAxios";
import { useQuery } from "react-query";
import { Card } from "../interfaces/Card";

export const CARD_QUERY_KEY = "card/";
const QUERY_PATH = "/cards/";

export const useCardQuery = (id: string) => {
  return useQuery<Card>(`${CARD_QUERY_KEY}${id}`, {
    queryFn: async () => {
      const response = await axios.get(QUERY_PATH + id);
      return response.data;
    },
  });
};
