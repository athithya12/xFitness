import BaseModel from "./baseModel";

interface Ingredient extends BaseModel {
  name: string;
  quantity: number;
  unit: string;
  proteins: number;
  carbs: number;
  fats: number;
  fibers: number;
  energy: number;
  category: string;
}

export default Ingredient;
