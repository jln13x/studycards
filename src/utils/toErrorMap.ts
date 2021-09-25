interface ValidationError {
  message: string;
  path: string;
}

export const toErrorMap = (errors: ValidationError[]) => {
  const errorMap: Record<string, string> = {};
  Object.values(errors).forEach(({ message, path }) => {
    errorMap[path] = message;
  });

  return errorMap;
};
