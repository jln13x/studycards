import { Badge, Button, Spinner } from "@chakra-ui/react";
import React from "react";
import { useHistory, useParams } from "react-router";
import { useDeleteCardMutation } from "../../mutations/useDeleteCardMutation";
import { useCardQuery } from "../../queries/useCardQuery";
import { AlertError } from "../Alert";
import { CustomModal } from "../CustomModal";

export const DELETE_CARD_PATH_NAME = "/:id/delete";

interface DeleteCardParams {
  id: string;
}

export const DeleteCardModal: React.FC = () => {
  const { id } = useParams<DeleteCardParams>();
  const { data, isLoading: isLoadingCard } = useCardQuery(id);
  const history = useHistory();

  const { mutateAsync, isLoading, isError } = useDeleteCardMutation();

  const deleteCard = async () => {
    await mutateAsync(id);
    history.goBack();
  };

  if (isLoadingCard) {
    return (
      <CustomModal title="Edit card">
        <Spinner />
      </CustomModal>
    );
  }

  if (!data) {
    return (
      <CustomModal title="Edit card">
        <p>No card found!</p>
      </CustomModal>
    );
  }

  return (
    <CustomModal
      title={"Delete card"}
      footer={
        <Button type="submit" isLoading={isLoading} onClick={deleteCard}>
          Delete
        </Button>
      }
      size="md"
    >
      {isError ? <AlertError /> : null}
      Card <Badge>{id}</Badge> will be deleted. Continue?
    </CustomModal>
  );
};
