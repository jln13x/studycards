import { Box, Flex, Grid } from "@chakra-ui/layout";
import { Button, Icon, Spinner } from "@chakra-ui/react";
import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Link, Route, useRouteMatch } from "react-router-dom";
import { AlertError } from "../components/Alert";
import { CardItem } from "../components/cards/CardItem";
import {
  CreateCardModal,
  CREATE_CARD_PATH_NAME,
} from "../components/cards/CreateCardModal";
import {
  DeleteCardModal,
  DELETE_CARD_PATH_NAME,
} from "../components/cards/DeleteCardModal";
import {
  EditCardModal,
  EDIT_CARD_PATH_NAME,
} from "../components/cards/EditCardModal";
import { useCardsQuery } from "../queries/useCardsQuery";

export const Cards: React.FC<{}> = () => {
  const { data, isLoading, isError } = useCardsQuery();
  const { path } = useRouteMatch();

  return (
    <>
      <Route path={`${path}`}>
        <Box padding={12}>
          <Flex justifyContent="end" mb={4}>
            <Button
              as={Link}
              to={`${path}${CREATE_CARD_PATH_NAME}`}
              size="lg"
              bg="none"
              color="red.600"
              _hover={{
                background: "none",
                color: "red.400",
                transform: "scale(1.25)",
                transition: "transform 0.125s ease-in",
              }}
            >
              <Icon as={FaPlusCircle} fontSize="xx-large" />
            </Button>
          </Flex>

          <Flex justifyContent="center" alignItems="center">
            {isLoading ? <Spinner size="xl" /> : null}
            {isError ? <AlertError /> : null}
          </Flex>

          <Grid templateColumns="repeat(4, 25%)" gap={6} maxW="80%" mx="auto">
            {data &&
              data.map((card) => <CardItem key={card._id} data={card} />)}
          </Grid>
        </Box>
      </Route>

      <Route path={`${path}${CREATE_CARD_PATH_NAME}`} exact>
        <CreateCardModal />
      </Route>

      <Route path={`${path}${EDIT_CARD_PATH_NAME}`} exact>
        <EditCardModal />
      </Route>

      <Route path={`${path}${DELETE_CARD_PATH_NAME}`} exact>
        <DeleteCardModal />
      </Route>
    </>
  );
};
