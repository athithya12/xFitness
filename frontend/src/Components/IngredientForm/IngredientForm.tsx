import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Grid,
  Group,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { Ingredient } from "Types";
import { numberValidation, stringValidation } from "Utils";

const UPDATE_INGREDIENT = gql`
  mutation UpdateIngredient(
    $ingredientId: Int!
    $ingredient: IngredientUpdateInput!
  ) {
    updateIngredient(ingredientId: $ingredientId, ingredient: $ingredient)
  }
`;

const ADD_INGREDIENT = gql`
  mutation AddIngredient($ingredient: IngredientInput!) {
    addIngredient(ingredient: $ingredient)
  }
`;

const unitOptions = [
  { label: "Gram(s)", value: "gram" },
  { label: "Milliliters(s)", value: "milliliter" },
  { label: "Scoop(s)", value: "scoop" },
  { label: "Teaspoon(s)", value: "teaspoon" },
  { label: "Tablespoon(s)", value: "tablespoon" },
  { label: "Piece(s)", value: "piece" },
];

const categoryOptions = [
  { label: "Whey", value: "whey" },
  { label: "Dairy", value: "dairy" },
  { label: "Soy", value: "soy" },
  { label: "Meat", value: "meat" },
  { label: "Egg", value: "egg" },
  { label: "Others", value: "others" },
];

interface Props {
  initialValues: Partial<
    Omit<
      Ingredient,
      "id" | "userId" | "knowledgeBeginDate" | "knowledgeEndDate"
    >
  >;
  ingredientId?: number;
  mode: "add" | "edit";
  onSuccessfulSave: () => void;
}

interface EditIngredientData {
  updateIngredient: string;
}

interface AddIngredientData {
  addIngredient: string;
}

const IngredientForm: React.FC<Props> = ({
  initialValues,
  mode,
  ingredientId,
  onSuccessfulSave,
}) => {
  const form = useForm<
    Partial<
      Omit<
        Ingredient,
        "id" | "userId" | "knowledgeBeginDate" | "knowledgeEndDate"
      >
    >
  >({
    initialValues: { ...initialValues },
    validate: {
      name: stringValidation,
      quantity: numberValidation,
      unit: stringValidation,
      proteins: numberValidation,
      carbs: numberValidation,
      fats: numberValidation,
      fibers: numberValidation,
      energy: numberValidation,
      category: stringValidation,
    },
  });

  const [
    updateIngredient,
    { loading: updateIngredientLoading, data: updateIngredientData },
  ] = useMutation<EditIngredientData>(UPDATE_INGREDIENT);

  const [
    addIngredient,
    { loading: addIngredientLoading, data: addIngredientData },
  ] = useMutation<AddIngredientData>(ADD_INGREDIENT);

  const getLoading = () => {
    if (mode === "edit") {
      return updateIngredientLoading;
    } else {
      return addIngredientLoading;
    }
  };

  useEffect(() => {
    if (
      updateIngredientData?.updateIngredient ===
        "Ingredient updated successfully!" ||
      addIngredientData?.addIngredient === "Ingredient added successfully!"
    ) {
      onSuccessfulSave();
    }
  }, [updateIngredientData, addIngredientData]);

  return (
    <Stack spacing={16}>
      <Grid>
        <Grid.Col span={12}>
          <TextInput
            label='Name'
            placeholder='Ingredient'
            required
            disabled={getLoading()}
            {...form.getInputProps("name")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            label='Quantity'
            placeholder='Quantity'
            required
            disabled={getLoading()}
            rightSection={<></>}
            {...form.getInputProps("quantity")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label='Unit'
            placeholder='Unit'
            required
            disabled={getLoading()}
            data={unitOptions}
            {...form.getInputProps("unit")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            label='Proteins (g)'
            placeholder='Proteins'
            required
            disabled={getLoading()}
            precision={3}
            rightSection={<></>}
            {...form.getInputProps("proteins")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            label='Carbs (g)'
            placeholder='Carbs'
            required
            disabled={getLoading()}
            precision={3}
            rightSection={<></>}
            {...form.getInputProps("carbs")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            label='Fats (g)'
            placeholder='Fats'
            required
            disabled={getLoading()}
            precision={3}
            rightSection={<></>}
            {...form.getInputProps("fats")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            label='Fibers (g)'
            placeholder='Fibers'
            required
            disabled={getLoading()}
            precision={3}
            rightSection={<></>}
            {...form.getInputProps("fibers")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <NumberInput
            label='Energy (kcal)'
            placeholder='Energy'
            required
            disabled={getLoading()}
            rightSection={<></>}
            {...form.getInputProps("energy")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Select
            label='Category'
            placeholder='Category'
            required
            disabled={getLoading()}
            data={categoryOptions}
            {...form.getInputProps("category")}
          />
        </Grid.Col>
      </Grid>
      <Group spacing={8}>
        <Box sx={{ flexGrow: 1 }} />
        <Button size='sm' variant='default' disabled onClick={() => {}}>
          Cancel
        </Button>
        <Button
          size='sm'
          variant='filled'
          disabled={getLoading()}
          onClick={() => {
            const validation = form.validate();

            if (!validation.hasErrors) {
              if (mode === "edit") {
                updateIngredient({
                  variables: { ingredientId, ingredient: form.values },
                });
              } else {
                addIngredient({ variables: { ingredient: form.values } });
              }
            }
          }}
        >
          Save
        </Button>
      </Group>
    </Stack>
  );
};

export default IngredientForm;
