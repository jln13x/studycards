import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { useState } from "react";
import { Markdown } from "./Markdown";

type MarkdownTextareaFieldProps =
  React.InputHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    label: string;
    rows?: number;
  };

export const MarkdownTextareaField: React.FC<MarkdownTextareaFieldProps> = ({
  label,
  size: _,
  rows,
  ...props
}) => {
  const [field, { error }] = useField(props);

  const { onChange: onChangeFieldFn, value, ...rest } = field;

  const [text, setText] = useState(value);

  const updateText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <FormControl isInvalid={!!error}>
      <Tabs size="md">
        <FormLabel htmlFor={field.name} m={0}>
          {label}
        </FormLabel>
        <TabList>
          <Tab>Edit</Tab>
          <Tab>Preview</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px="0">
            <Textarea
              {...field}
              {...props}
              id={field.name}
              placeholder={props.placeholder}
              onChange={(e) => {
                updateText(e);
                onChangeFieldFn(e);
              }}
              rows={rows || 6}
              {...rest}
            />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
          </TabPanel>
          <TabPanel px="0">
            {text !== "" ? (
              <Box bg="blackAlpha.500" padding={1}>
                <Markdown markdown={text} />
              </Box>
            ) : null}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </FormControl>
  );
};
