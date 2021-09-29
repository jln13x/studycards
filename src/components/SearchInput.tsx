import Icon from "@chakra-ui/icon";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
  return (
    <InputGroup size="md">
      <Input
        placeholder="Search..."
        onChange={(e) => onChange(e)}
        _hover={{
          paddingY: "8",
          fontSize: "xl",
          "+*": {
            height: "100%",
            fontSize: "xl",
          },
        }}
        _focus={{
          borderColor: "red.800",
        }}
        transition={"all 0.25s ease-in-out"}
      />
      <InputRightElement>
        <Icon as={FaSearch} transition={"all 0.25s ease-in-out"} />
      </InputRightElement>
    </InputGroup>
  );
};
