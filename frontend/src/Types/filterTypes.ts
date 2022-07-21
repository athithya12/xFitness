export interface FilterType {
  column: string;
  operator: ">=" | "<=" | "IS";
  filter: number | string[];
}

export interface Column {
  label: string;
  value: string;
  type: "multiselect" | "number" | "date" | "string";
}
