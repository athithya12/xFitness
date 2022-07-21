export const stringValidation = (value: string | undefined) => {
  if (!value || value.length === 0) {
    return "Field cannot be empty!";
  }
};

export const numberValidation = (value: number | undefined) => {
  if (value === undefined) {
    return "Field cannot be empty!";
  }
};
