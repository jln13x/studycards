import { Button, Spinner, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";
import { CreateCardModel } from "../../interfaces/Card";
import { useEditCardMutation } from "../../mutations/useEditCardMutation";
import { useCardQuery } from "../../queries/useCardQuery";
import { reverseTransform } from "../../utils/prepareTags";
import { toErrorMap } from "../../utils/toErrorMap";
import { CustomModal } from "../CustomModal";
import { ImageUploadField } from "../ImageUploadField";
import { InputField } from "../InputField";
import { MarkdownTextareaField } from "../MarkdownTextareaField";
import { useHistory } from "react-router-dom";

interface EditCardParams {
  id: string;
}

export const EDIT_CARD_PATH_NAME = "/:id/edit";

export const EditCardModal: React.FC = () => {
  const params = useParams<EditCardParams>();
  const { data, isLoading } = useCardQuery(params.id);
  const { goBack } = useHistory();

  const { mutateAsync } = useEditCardMutation();

  if (isLoading) {
    return (
      <CustomModal title="Edit card">
        <Spinner />
      </CustomModal>
    );
  }

  if (!data) {
    return (
      <CustomModal title="Edit card">
        <p>No card found!</p>
      </CustomModal>
    );
  }

  const { title, question, answer, tags, images, _id } = data;

  const initialValues = {
    title,
    question,
    answer,
    tags: reverseTransform(tags),
    images: images || [],
  } as CreateCardModel & {
    tags: string;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        if (typeof values.tags === "string") {
          //@ts-ignore
          values.tags = values.tags.split(",");
        }

        // FIXME
        //@ts-ignore
        const { errors } = await mutateAsync({ ...values, _id });

        if (errors) {
          const err = toErrorMap(errors);
          setErrors(err);
        } else {
          goBack();
        }
      }}
    >
      {({ isSubmitting, values }) => (
        <CustomModal
          title="Edit card"
          size="full"
          footer={
            <Button type="submit" isLoading={isSubmitting}>
              Edit
            </Button>
          }
          wrapper={Form}
        >
          <VStack spacing={4}>
            <InputField
              name="title"
              placeholder="Enter title..."
              label="Title"
            />

            <MarkdownTextareaField
              name="question"
              placeholder="Enter question..."
              label="Question"
              rows={4}
            />

            <MarkdownTextareaField
              name="answer"
              placeholder="Enter answer..."
              label="Answer"
              rows={24}
            />

            <ImageUploadField data={values.images} />

            <InputField name="tags" placeholder="Enter tags..." label="Tags" />
          </VStack>
        </CustomModal>
      )}
    </Formik>
  );
};
