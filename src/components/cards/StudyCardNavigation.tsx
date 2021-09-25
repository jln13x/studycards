import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";
import React from "react";

interface StudyCardNavigationProps {
  disabled: boolean;
  onClick: () => void;
  direction: "left" | "right";
  size?: number;
}

export const StudyCardNavigation: React.FC<StudyCardNavigationProps> = ({
  onClick,
  direction,
  disabled,
  size = 32,
}) => {
  return (
    <Link disabled={disabled} onClick={onClick} variant="ghost" size="lg" _hover={{color: "red.400"}} _disabled={{opacity: 0.5, color: "white", cursor: "not-allowed"}}>
      {direction === "left" ? (
        <ChevronLeftIcon w={size} h={size} />
      ) : (
        <ChevronRightIcon w={size} h={size} />
      )}
    </Link>
  );
};
