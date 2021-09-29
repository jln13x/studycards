import { Badge } from "@chakra-ui/layout";
import React from "react";

interface TagProps {
  tag: string;
}

export const Tag: React.FC<TagProps> = ({ tag }) => {
  return (
    <Badge bgColor="whiteAlpha.100" rounded={4} textTransform="lowercase">
      {tag}
    </Badge>
  );
};

interface TagsProps {
  tags: string[];
}
export const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <>
      {tags.map((tag, idx) => (
        <Tag key={`${idx}-${tag}`} tag={tag} />
      ))}
    </>
  );
};
