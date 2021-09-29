const setPathParameters = (
  path: string,
  parameters: Record<string, string | number>
) => {
  let newPath = path;

  Object.keys(parameters).forEach((key) => {
    newPath = newPath.replaceAll(":" + key, "" + parameters[key]);
  });

  return newPath;
};

export default setPathParameters;
