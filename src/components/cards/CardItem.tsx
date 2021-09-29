import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useRouteMatch } from "react-router-dom";
import { Card } from "../../interfaces/Card";
import setPathParameters from "../../utils/setPathParameters";
import { Markdown } from "../Markdown";
import { DELETE_CARD_PATH_NAME } from "./DeleteCardModal";
import { EDIT_CARD_PATH_NAME } from "./EditCardModal";
import { Tags } from "./Tag";

interface CardItemProps {
  data: Card;
}

export const CardItem: React.FC<CardItemProps> = ({ data }) => {
  const { title, question, tags, _id } = data;
  const { path } = useRouteMatch();

  const EDIT_CARD_PATH_WITH_ID = setPathParameters(EDIT_CARD_PATH_NAME, {
    id: _id,
  });

  const DELETE_CARD_PATH_WITH_ID = setPathParameters(DELETE_CARD_PATH_NAME, {
    id: _id,
  });

  return (
    <Flex
      backgroundColor="blackAlpha.600"
      boxShadow="md"
      flexDirection="column"
      justifyContent="space-between"
      rounded={8}
      _hover={{ bg: "blackAlpha.400" }}
      h="100%"
      w="100%"
    >
      <Flex
        bgColor="red.900"
        p={2}
        boxShadow="xl"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>{title}</Text>
        <Box>
          <ButtonGroup size="xs" bgColor="none">
            <Button as={Link} to={`${path}${EDIT_CARD_PATH_WITH_ID}`}>
              <Icon as={FaEdit} />
            </Button>

            <Button as={Link} to={`${path}${DELETE_CARD_PATH_WITH_ID}`}>
              <Icon as={FaTrash} />
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>

      <Flex
        p={2}
        flexDir="column"
        justifyContent="space-between"
        flexGrow={1}
        overflow="hidden"
      >
        <Box fontSize="sm" overflow="hidden">
          <Markdown markdown={question} />
        </Box>

        <HStack mt={4}>
          <Tags tags={tags} />
        </HStack>
      </Flex>
    </Flex>
  );
};
