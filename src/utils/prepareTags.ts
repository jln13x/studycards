export const transform = (tags: string) => {
  return tags.split(",");
};

export const reverseTransform = (tags: string[]) => {
  return tags.join(",");
};
