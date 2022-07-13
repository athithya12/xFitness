import { IngredientsModel } from "../models";
import BaseAccessor from "./baseAccessor";

class IngredientsAccessor extends BaseAccessor<IngredientsModel> {
  constructor(userId: number) {
    super(userId, "ingredients");
  }
}

export default IngredientsAccessor;
