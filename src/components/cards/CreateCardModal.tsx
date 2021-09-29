import {
  Badge,
  Button,
  Checkbox,
  CheckboxGroup,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CreateCardModel } from "../../interfaces/Card";
import { useCreateCardMutation } from "../../mutations/useCreateCardMutation";
import { toErrorMap } from "../../utils/toErrorMap";
import { AlertSuccess } from "../Alert";
import { CustomModal } from "../CustomModal";
import { ImageUploadField } from "../ImageUploadField";
import { InputField } from "../InputField";
import { MarkdownTextareaField } from "../MarkdownTextareaField";

export const CREATE_CARD_PATH_NAME = "/create";

export const CreateCardModal: React.FC = () => {
  const { mutateAsync } = useCreateCardMutation();
  const history = useHistory();

  const [keepOpen, setKeepOpen] = useState(false);
  const [resetFormOnCreate, setResetFormOnCreate] = useState(false);

  const initialValues = {
    title: "",
    question: "",
    answer: "",
    tags: [],
    images: [],
  } as CreateCardModel;

  return (
    <Formik
      initialStatus={{}}
      initialValues={initialValues}
      onSubmit={async (values, { setErrors, resetForm, setStatus }) => {
        if (typeof values.tags === "string") {
          //@ts-ignore
          values.tags = values.tags.split(",");
        }

        console.log(values);

        // FIXME
        //@ts-ignore
        const { errors } = await mutateAsync(values);

        if (errors) {
          const err = toErrorMap(errors);
          setErrors(err);
          return;
        } else {
          resetFormOnCreate && resetForm();
          keepOpen || history.push("/cards");
        }

        setStatus({
          success: {
            data: values,
          },
        });
      }}
    >
      {({
        isSubmitting,
        handleReset,
        handleSubmit,
        status,
        touched,
        dirty,
        values,

        ...props
      }) => (
        <Form>
          <CustomModal
            title="Create card"
            size="6xl"
            footer={
              <>
                <CheckboxGroup>
                  <Checkbox
                    checked={resetFormOnCreate}
                    onChange={(e) => setResetFormOnCreate(e.target.checked)}
                    mr={2}
                  >
                    Reset on create
                  </Checkbox>
                  <Checkbox
                    checked={keepOpen}
                    onChange={(e) => setKeepOpen(e.target.checked)}
                  >
                    Keep open
                  </Checkbox>
                </CheckboxGroup>
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
              {status && status.success && (
                <AlertSuccess>
                  The card <Badge>{status.success?.data?.title}</Badge> was
                  created!
                </AlertSuccess>
              )}
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

              <ImageUploadField data={values.images} />

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
