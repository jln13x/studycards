import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import React from "react";

interface AlertErrorProps {
  msg?: string;
}

const DEFAULT_ERROR_MESSAGE = "Es ist ein Fehler aufgetreten!";
const DEFAULT_SUCCESS_MESSAGE = "Success!";

export const AlertError: React.FC<AlertErrorProps> = ({
  msg = DEFAULT_ERROR_MESSAGE,
}) => (
  <Alert status="error" rounded={4}>
    <AlertIcon />
    <AlertTitle mr={2}>{msg}</AlertTitle>
  </Alert>
);

export const AlertSuccess: React.FC<AlertErrorProps> = ({
  msg = DEFAULT_SUCCESS_MESSAGE,
  children,
}) => (
  <Alert status="success" rounded={4}>
    <AlertIcon />
    <AlertTitle mr={2}>{msg}</AlertTitle>
    <AlertDescription>{children}</AlertDescription>
  </Alert>
);
