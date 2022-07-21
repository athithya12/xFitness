import { gql, useMutation, useQuery } from "@apollo/client";
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
import { useModals } from "@mantine/modals";
import { useNotifications } from "@mantine/notifications";
import { ColumnDef, Table } from "@tanstack/react-table";
import { IngredientForm, Layout, XTable } from "Components";
import { useState } from "react";
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
import { copyRow } from "Utils";

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

const DELETE_INGREDIENT = gql`
  mutation DeleteIngredient($ingredientId: Int!) {
    deleteIngredient(ingredientId: $ingredientId)
  }
`;

interface Data {
  ingredients: Ingredient[];
}

interface DeleteIngredientData {
  deleteIngredient: string;
}

const categoryColorMap = {
  whey: "blue",
  dairy: "teal",
  soy: "cyan",
  meat: "grape",
  egg: "pink",
  others: "indigo",
};

const IngredientsPage = () => {
  const modals = useModals();
  const notifications = useNotifications();

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
      header: "Ingredient",
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
      accessorKey: "energy",
      header: "Energy (kcal)",
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
      cell: ({ row }) => {
        return (
          <Group spacing={16}>
            <ActionIcon
              onClick={() => {
                const { id, name } = row.original;

                copyRow<Ingredient>(row.original);
                notifications.showNotification({
                  id: `ingredient-copy-success-${id}`,
                  autoClose: 5000,
                  title: "Copied!",
                  message: `Copied ${name} to clipboard!`,
                  color: "blue",
                });
              }}
            >
              <Copy size={20} />
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                const { id, name } = row.original;

                if (id) {
                  openDeleteIngredientModal(id, name);
                }
              }}
            >
              <Trash size={20} />
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                const {
                  id,
                  userId,
                  knowledgeBeginDate,
                  knowledgeEndDate,
                  ...fields
                } = row.original;
                if (id) {
                  openEditIngredientModal(id, fields);
                }
              }}
            >
              <Edit size={20} />
            </ActionIcon>
          </Group>
        );
      },
    },
  ];

  const { data, refetch } = useQuery<Data>(GET_INGREDIENTS);

  const [deleteIngredient, { loading: deleteIngredientLoading }] =
    useMutation<DeleteIngredientData>(DELETE_INGREDIENT);

  const [table, setTable] = useState<Table<Ingredient> | undefined>(
    undefined
  );

  const openEditIngredientModal = (
    ingredientId: number,
    initialValues: Omit<
      Ingredient,
      "id" | "userId" | "knowledgeBeginDate" | "knowledgeEndDate"
    >
  ) => {
    const id = modals.openModal({
      title: "Edit Ingredient",
      children: (
        <IngredientForm
          initialValues={initialValues}
          mode='edit'
          ingredientId={ingredientId}
          onSuccessfulSave={() => {
            modals.closeModal(id);
            notifications.showNotification({
              id: `ingredient-update-success-${ingredientId}`,
              autoClose: 5000,
              title: "Success!",
              message: "Ingredient updated succesfully!",
              color: "green",
            });
            refetch();
          }}
        />
      ),
    });
  };

  const openAddIngredientModal = () => {
    const id = modals.openModal({
      title: "Add Ingredient",
      children: (
        <IngredientForm
          initialValues={{
            name: undefined,
            quantity: undefined,
            unit: undefined,
            proteins: undefined,
            carbs: undefined,
            fats: undefined,
            fibers: undefined,
            energy: undefined,
            category: undefined,
          }}
          mode='add'
          onSuccessfulSave={() => {
            modals.closeModal(id);
            notifications.showNotification({
              id: "ingredient-add-success",
              autoClose: 5000,
              title: "Success!",
              message: "Ingredient added succesfully!",
              color: "green",
            });
            refetch();
          }}
        />
      ),
    });
  };

  const openDeleteIngredientModal = (
    ingredientId: number,
    ingredientName: string
  ) => {
    const id = modals.openConfirmModal({
      title: "Delete ingredient",
      children: (
        <Text size='sm'>
          Are you sure you want to delete {ingredientName} from your list
          of ingredients?
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red", loading: deleteIngredientLoading },
      cancelProps: { disabled: deleteIngredientLoading },
      onConfirm: () => {
        deleteIngredient({
          variables: { ingredientId: ingredientId },
        }).then((data) => {
          if (
            data.data?.deleteIngredient ===
            "Ingredient deleted successfully!"
          ) {
            modals.closeModal(id);
            notifications.showNotification({
              id: `ingredient-delete-success-${ingredientId}`,
              autoClose: 5000,
              title: "Success!",
              message: "Ingredient deleted succesfully!",
              color: "green",
            });
            refetch();
          }
        });
      },
    });
  };

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
          height: "100%",
          overflowY: "auto",
        })}
        spacing={0}
      >
        <Group p={16} spacing={0}>
          <Box sx={{ flex: 1 }}>
            <Button
              size='sm'
              variant='default'
              leftIcon={<Filter size={20} />}
              onClick={() => {}}
              disabled
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
            <Button
              size='sm'
              leftIcon={<Plus size={20} />}
              onClick={() => {
                openAddIngredientModal();
              }}
            >
              Add Ingredient
            </Button>
          </Group>
        </Group>
        <Divider />
        <Box sx={{ height: "100%", overflowY: "auto" }}>
          {data && (
            <XTable
              // @ts-ignore
              columns={columns}
              data={data.ingredients}
              getTableInstance={(table) => {
                // @ts-ignore
                setTable(table);
              }}
            />
          )}
        </Box>
      </Stack>
    </Layout>
  );
};

export default IngredientsPage;
