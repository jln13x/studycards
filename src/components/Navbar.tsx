import { Icon, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { FaBook, FaColumns} from "react-icons/fa";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <Flex height="100%">
      <NavItem path="/cards" name="Cards" icon={FaColumns}/>
      <NavItem path="/study" name="Study" icon={FaBook} />
    </Flex>
  );
};

interface NavItemProps {
  path: string;
  name: string;
  icon?: any
}

const NavItem: React.FC<NavItemProps> = ({ path, name, icon }) => {
  const { pathname } = useLocation();

  const defaultColor = "red.900";
  const activeColor = "red.700";

  const bg = pathname === path ? activeColor : defaultColor;

  return (
    <Flex
      flex="1"
      justifyContent="center"
      alignItems="center"
      bg={bg}
      _hover={{ bg: "red.600" }}
      as={RouterLink}
      to={path}
    >
      {icon && <Icon as={icon}  mr={2} height="100%" w={4}/>}
      <Text
        textDecoration="none"
        textTransform="uppercase"
        fontSize="2xl"
        letterSpacing="normal"
      >
        {name}
      </Text>
    </Flex>
  );
};
