export const copyRow = <RowShape extends {}>(rowValues: RowShape) => {
  let copyValue = "";
  for (const [, value] of Object.entries(rowValues)) {
    copyValue += String(value);
    copyValue += ", ";
  }
  copyValue = copyValue.slice(0, -2);

  navigator.clipboard.writeText(copyValue);
};
