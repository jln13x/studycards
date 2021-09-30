import { Button } from "@chakra-ui/button";
import React from "react";

interface LoadMoreProps {
  loading: boolean;
  onClick: () => void;
}

export const LoadMore: React.FC<LoadMoreProps> = ({ loading, onClick }) => {
  return (
    <Button
      bg="blackAlpha.400"
      color="whiteAlpha.700"
      textTransform="uppercase"
      w="100%"
      variant="solid"
      _focus={{ outline: "none" }}
      onClick={() => onClick()}
    >
      Load more
    </Button>
  );
};
