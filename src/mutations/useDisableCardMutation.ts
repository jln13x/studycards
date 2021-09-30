import { useMutation, useQueryClient } from "react-query";
import { CARDS_QUERY_KEY } from "../queries/useInfiniteCardsQuery";
import { preConfiguredAxios as axios } from "../utils/preconfiguredAxios";
import setPathParameters from "../utils/setPathParameters";

interface DisableCardInterface {
  _id: number;
  payload: {
    isDisabled: boolean;
  };
}

const MUTATION_KEY = "cards/disable/";
const MUTATION_PATH = "/cards/:id/disable";

export const useDisableCardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, DisableCardInterface>(MUTATION_KEY, {
    mutationFn: async (data) => {
      const { _id, payload } = data;

      await axios.post(setPathParameters(MUTATION_PATH, { id: _id }), payload);
      queryClient.invalidateQueries(CARDS_QUERY_KEY);
    },
  });
};
