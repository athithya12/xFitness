import { Box, Button, Group, Modal, Stack } from "@mantine/core";
import { useState } from "react";
import { Plus } from "tabler-icons-react";
import { Column, FilterType } from "Types";
import Filter from "./Filter";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: FilterType[];
  columns: Column[];
  onApply: (filters: FilterType[]) => void;
}

const FiltersModal: React.FC<Props> = ({
  open,
  setOpen,
  filters,
  columns,
  onApply,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterType[]>([
    ...filters,
  ]);

  return (
    <Modal
      opened={open}
      onClose={() => {
        setLocalFilters([...filters]);
        setOpen(false);
      }}
      title='Filters'
      size='lg'
    >
      <Stack spacing={16} align='start'>
        {localFilters.map((el, index) => (
          <Filter
            key={`${el.column}${el.operator}${el.filter}${index}`}
            columns={columns}
            multiSelectFilterOptions={[]}
            data={el}
            onChange={({ column, operator, filter }) => {
              let tempLocalFilters = [...localFilters];

              tempLocalFilters[index].column = column;
              tempLocalFilters[index].operator = operator;
              tempLocalFilters[index].filter = filter;

              setLocalFilters([...tempLocalFilters]);
            }}
            onDelete={() => {
              let tempLocalFilters = [...localFilters];

              tempLocalFilters.splice(index, 1);

              console.log(tempLocalFilters);

              setLocalFilters(tempLocalFilters);
            }}
          />
        ))}
        <Button
          size='xs'
          variant='light'
          leftIcon={<Plus size={14} />}
          onClick={() => {
            const tempLocalFilters = [...localFilters];

            tempLocalFilters.push({
              // @ts-ignore
              column: undefined,
              // @ts-ignore
              filter: undefined,
              // @ts-ignore
              operator: undefined,
            });

            setLocalFilters([...tempLocalFilters]);
          }}
        >
          Add
        </Button>
      </Stack>
      <Group spacing={8}>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          size='sm'
          variant='default'
          onClick={() => {
            setLocalFilters([...filters]);
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          size='sm'
          variant='filled'
          onClick={() => {
            setOpen(false);
            onApply(filters);
          }}
        >
          Apply
        </Button>
      </Group>
    </Modal>
  );
};

export default FiltersModal;
