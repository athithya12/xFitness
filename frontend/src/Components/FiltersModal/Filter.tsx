import {
  ActionIcon,
  Center,
  Grid,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Trash } from "tabler-icons-react";
import { Column, FilterType } from "Types";

interface Props {
  columns: Column[];
  multiSelectFilterOptions?: { label: string; value: string }[];
  data: FilterType;
  onChange: (filter: FilterType) => void;
  onDelete: () => void;
}

const numericFilterOperators = [
  { label: ">=", value: ">=" },
  { label: "<=", value: "<=" },
];

const multiselectFilterOperators = [{ label: "IS", value: "IS" }];

const Filter: React.FC<Props> = ({
  columns,
  multiSelectFilterOptions,
  data,
  onChange,
  onDelete,
}) => {
  const [column, setColumn] = useState(data.column);
  const [operator, setOperator] = useState(data.operator);
  const [filter, setFilter] = useState(data.filter);

  useEffect(() => {
    onChange({ column, operator, filter });
  }, [column, operator, filter]);

  let columnTypeMap: { [key: string]: string } = {};

  columns.forEach((el) => {
    columnTypeMap[el.value] = el.type;
  });

  return (
    <Group spacing={0} sx={{ width: "100%" }}>
      <Grid gutter='xs' sx={{ width: "90%" }}>
        <Grid.Col span={4}>
          <Select
            size='xs'
            placeholder='Column'
            data={columns}
            value={column}
            // @ts-ignore
            onChange={setColumn}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            size='xs'
            placeholder='Operator'
            data={
              columnTypeMap[column] === "number"
                ? numericFilterOperators
                : multiselectFilterOperators
            }
            disabled={column === undefined}
            value={operator}
            // @ts-ignore
            onChange={setOperator}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          {column === undefined ? (
            <TextInput size='xs' placeholder='Filter value' disabled />
          ) : columnTypeMap[column] === "multiselect" ? (
            <MultiSelect
              size='xs'
              placeholder='Filter values'
              value={filter as string[]}
              onChange={setFilter}
              data={
                multiSelectFilterOptions ? multiSelectFilterOptions : []
              }
            />
          ) : columnTypeMap[column] === "number" ? (
            <NumberInput
              size='xs'
              placeholder='Filter value'
              value={filter as number}
              onChange={(val) => {
                if (val) {
                  setFilter(val);
                }
              }}
            />
          ) : (
            <TextInput size='xs' placeholder='Filter value' disabled />
          )}
        </Grid.Col>
      </Grid>
      <Center sx={{ flex: "1 0 auto" }}>
        <ActionIcon
          onClick={() => {
            onDelete();
          }}
        >
          <Trash size={16} />
        </ActionIcon>
      </Center>
    </Group>
  );
};

export default Filter;
