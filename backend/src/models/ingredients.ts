import { BaseModel } from "./baseModel";

export interface IngredientsModel extends BaseModel {
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
