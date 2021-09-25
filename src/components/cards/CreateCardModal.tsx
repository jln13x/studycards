import { Button, Checkbox, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CreateCardModel } from "../../interfaces/Card";
import { useCreateCardMutation } from "../../mutations/useCreateCardMutation";
import { toErrorMap } from "../../utils/toErrorMap";
import { CustomModal } from "../CustomModal";
import { InputField } from "../InputField";
import { MarkdownTextareaField } from "../MarkdownTextareaField";

export const CREATE_CARD_PATH_NAME = "/create";

export const CreateCardModal: React.FC = () => {
  const { mutateAsync } = useCreateCardMutation();
  const history = useHistory();

  const [keepOpen, setKeepOpen] = useState(false);

  const initialValues = {
    title: "",
    question: "",
    answer: "",
    tags: [],
  } as CreateCardModel;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setErrors, resetForm }) => {
        if (typeof values.tags === "string") {
          //@ts-ignore
          values.tags = values.tags.split(",");
        }

        // FIXME
        //@ts-ignore
        const { errors } = await mutateAsync(values);

        if (errors) {
          const err = toErrorMap(errors);
          setErrors(err);
        } else {
          if (keepOpen) {
            resetForm();
          } else {
            resetForm();
            history.push("/cards");
          }
        }
      }}
    >
      {({ isSubmitting, handleReset, handleSubmit, ...props }) => (
        <Form>
          <CustomModal
            title="Create card"
            size="6xl"
            footer={
              <>
                <Checkbox
                  checked={keepOpen}
                  onChange={(e) => setKeepOpen(e.target.checked)}
                >
                  Keep open
                </Checkbox>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  ml={4}
                  tabIndex={5}
                >
                  Create
                </Button>
              </>
            }
            wrapper={Form}
          >
            <VStack spacing={4}>
              <InputField
                name="title"
                placeholder="Enter title..."
                label="Title"
                tabIndex={1}
              />

              <MarkdownTextareaField
                name="question"
                placeholder="Enter question..."
                label="Question"
                tabIndex={2}
              />

              <MarkdownTextareaField
                name="answer"
                placeholder="Enter answer..."
                label="Answer"
                tabIndex={3}
              />

              <InputField
                name="tags"
                placeholder="Enter tags..."
                label="Tags"
                tabIndex={4}
              />
            </VStack>
          </CustomModal>
        </Form>
      )}
    </Formik>
  );
};
