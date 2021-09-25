import { preConfiguredAxios as axios } from "../utils/preconfiguredAxios";
import { useMutation, useQueryClient } from "react-query";
import { Card, CreateCardModel } from "../interfaces/Card";
import { CARDS_QUERY_KEY } from "../queries/useCardsQuery";

const MUTATION_KEY = "cards/create";
const MUTATION_PATH = "/cards";

export const useCreateCardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Card, unknown, CreateCardModel, unknown>(MUTATION_KEY, {
    mutationFn: async (data) => {
      const response = await axios.post(MUTATION_PATH, data);
      queryClient.invalidateQueries(CARDS_QUERY_KEY);
      return response.data;
    },
  });
};
