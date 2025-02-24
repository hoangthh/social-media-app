export const convertToPascalCase = (string) => {
  if (!string) return "";

  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getLastWordOfName = (string) => {
  if (!string) return "";

  return convertToPascalCase(string).split(" ").at(-1);
};
