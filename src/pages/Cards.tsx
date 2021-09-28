import { Box, Flex, Grid } from "@chakra-ui/layout";
import { Button, Icon, Spinner } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Link, Route, useRouteMatch } from "react-router-dom";
import { AlertError } from "../components/Alert";
import { CardItem } from "../components/cards/CardItem";
import {
  CreateCardModal,
  CREATE_CARD_PATH_NAME
} from "../components/cards/CreateCardModal";
import {
  DeleteCardModal,
  DELETE_CARD_PATH_NAME
} from "../components/cards/DeleteCardModal";
import {
  EditCardModal,
  EDIT_CARD_PATH_NAME
} from "../components/cards/EditCardModal";
import { SearchInput } from "../components/SearchInput";
import { useCardsQuery } from "../queries/useCardsQuery";

export const Cards: React.FC<{}> = () => {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useCardsQuery(search);
  const { path } = useRouteMatch();

  useEffect(() => {
    setSearch(value);
  }, [value]);

  const timeoutRef = useRef<NodeJS.Timeout>();

  return (
    <>
      <Route path={`${path}`}>
        <Box
          padding={{
            base: "2",
            "2xl": "12",
          }}
        >
          <Flex justifyContent="space-between" mb={4} alignItems="center">
            <SearchInput
              onChange={(e) => {
                timeoutRef.current && clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(
                  () => setValue(e.target.value),
                  200
                );
              }}
            />
            <Button
              as={Link}
              variant="link"
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
              _focus={{
                outline: "none"
              }}
            >
              <Icon as={FaPlusCircle} fontSize="xx-large" />
            </Button>
          </Flex>

          <Flex justifyContent="center" alignItems="center">
            {isLoading ? <Spinner size="xl" /> : null}
            {isError ? <AlertError /> : null}
          </Flex>

          <Grid
            templateColumns={{
              md: "1fr",
              lg: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
              "2xl": "repeat(4, 1fr)",
            }}
            gap={{
            base: 2,
            lg: 6,
            }}
          >
            {data &&
              data.map((card) => (
                <Box key={card._id} height="20vh">
                  <CardItem data={card} />
                </Box>
              ))}
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
