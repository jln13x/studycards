import { preConfiguredAxios as axios } from "../utils/preconfiguredAxios";
import { useMutation, useQueryClient } from "react-query";
import { Card } from "../interfaces/Card";
import { CARDS_QUERY_KEY } from "../queries/useCardsQuery";
import { CARD_QUERY_KEY } from "../queries/useCardQuery";

const MUTATION_KEY = "cards/edit";
const MUTATION_PATH = "/cards/";

export const useEditCardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Card, unknown, Card, unknown>(MUTATION_KEY, {
    mutationFn: async (data) => {
      const response = await axios.patch(MUTATION_PATH + data._id, data);
      queryClient.invalidateQueries(CARDS_QUERY_KEY);
      queryClient.invalidateQueries(CARD_QUERY_KEY + data._id);
      return response.data;
    },
  });
};
