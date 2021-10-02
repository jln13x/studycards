import { preConfiguredAxios as axios } from "../utils/preconfiguredAxios";
import { useMutation, useQueryClient } from "react-query";
import { CARDS_QUERY_KEY } from "../queries/useCardsQuery";
import { INFINITE_CARDS_QUERY_KEY } from "../queries/useInfiniteCardsQuery";

const MUTATION_KEY = "cards/delete";
const MUTATION_PATH = "/cards/";

export const useDeleteCardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, string, unknown>(MUTATION_KEY, {
    mutationFn: async (_id) => {
      const response = await axios.delete(MUTATION_PATH + _id);
      queryClient.invalidateQueries(CARDS_QUERY_KEY);
      queryClient.invalidateQueries(INFINITE_CARDS_QUERY_KEY);
      return response.data;
    },
  });
};
