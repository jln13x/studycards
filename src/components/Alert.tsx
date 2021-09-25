import {
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import React from "react";

interface AlertErrorProps {
  msg?: string;
}

const DEFAULT_ERROR_MESSAGE = "Es ist ein Fehler aufgetreten!";

export const AlertError: React.FC<AlertErrorProps> = ({
  msg = DEFAULT_ERROR_MESSAGE,
}) => (
  <Alert status="error" rounded={4}>
    <AlertIcon />
    <AlertTitle mr={2}>{msg}</AlertTitle>
  </Alert>
);
