import { gql, useQuery } from "@apollo/client";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { ColumnDef, Table } from "@tanstack/react-table";
import { Layout, XTable } from "Components";
import { ingredients } from "Data";
import { useEffect, useState } from "react";
import {
  CloudUpload,
  Copy,
  Edit,
  Filter,
  Plus,
  Search,
  Trash,
} from "tabler-icons-react";
import { Ingredient } from "Types";

const GET_INGREDIENTS = gql`
  query GetIngredients {
    ingredients {
      id
      name
      quantity
      unit
      proteins
      carbs
      fats
      fibers
      energy
      category
    }
  }
`;

interface Data {
  ingredients: Ingredient[];
}

const categoryColorMap = {
  whey: "blue",
  dairy: "teal",
  soy: "cyan",
  meat: "grape",
  egg: "pink",
  others: "indigo",
};

const columns: ColumnDef<Ingredient>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
        size='xs'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        {...{
          checked: row.getIsSelected(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
        size='xs'
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {},
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "proteins",
    header: "Proteins (g)",
  },
  {
    accessorKey: "carbs",
    header: "Carbs (g)",
  },
  {
    accessorKey: "fats",
    header: "Fats (g)",
  },
  {
    accessorKey: "fibers",
    header: "Fibers (g)",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: (info) => (
      <Badge
        // @ts-ignore
        color={categoryColorMap[info.getValue()]}
        sx={{ borderRadius: 4 }}
      >
        {info.getValue()}
      </Badge>
    ),
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <Group spacing={16}>
        <ActionIcon disabled>
          <Copy size={20} />
        </ActionIcon>
        <ActionIcon disabled>
          <Trash size={20} />
        </ActionIcon>
        <ActionIcon disabled>
          <Edit size={20} />
        </ActionIcon>
      </Group>
    ),
  },
];

const IngredientsPage = () => {
  const { data } = useQuery<Data>(GET_INGREDIENTS);

  const [table, setTable] = useState<Table<Ingredient> | undefined>(
    undefined
  );

  return (
    <Layout activeTab={1}>
      <Stack spacing={4}>
        <Title order={1} sx={{ fontSize: 30, fontWeight: "normal" }}>
          Ingredients
        </Title>
        <Text
          sx={(theme) => ({
            fontSize: 16,
            color: `${theme.colors.gray[7]}`,
          })}
        >
          Manage all your ingredients here. Just like in a kitchen 😉.
        </Text>
      </Stack>
      <Stack
        sx={(theme) => ({
          border: `1px solid ${theme.colors.gray[3]}`,
          borderRadius: 4,
        })}
        spacing={0}
      >
        <Group p={16} spacing={0}>
          <Box sx={{ flex: 1 }}>
            <Button
              size='sm'
              variant='default'
              leftIcon={<Filter size={20} />}
            >
              Filters
            </Button>
          </Box>
          <Group spacing={8}>
            <TextInput
              placeholder='Search'
              icon={<Search size={16} />}
              onChange={(e) => {
                const nameColumn = table?.getColumn("name");

                return nameColumn?.setFilterValue(e.target.value);
              }}
            />
            <Button
              variant='default'
              disabled
              size='sm'
              leftIcon={<CloudUpload size={20} />}
            >
              Import
            </Button>
            <Button size='sm' leftIcon={<Plus size={20} />}>
              Add Ingredient
            </Button>
          </Group>
        </Group>
        <Divider />
        <XTable
          // @ts-ignore
          columns={columns}
          data={ingredients}
          getTableInstance={(table) => {
            // @ts-ignore
            setTable(table);
          }}
        />
      </Stack>
    </Layout>
  );
};

export default IngredientsPage;
