import { action, makeObservable, observable } from "mobx";
import { FilterType } from "Types";

class IngredientsFiltersStore {
  filters: FilterType[] = [];

  setFilters = (filters: FilterType[]) => {
    this.filters = filters;
  };

  constructor() {
    makeObservable(this, {
      filters: observable,
      setFilters: action,
    });
  }
}

const ingredientsFiltersStore = new IngredientsFiltersStore();

export default ingredientsFiltersStore;
