export interface IAdminState {
  mainCategories: any[];
  subCategories: any[];
  readings: any[];
  food: {
    categories: { id: number; name: string }[];
    byCategory: any[];
    nutrients: any[];
    chosenNutrients: any;
  };
}
export const InitialState: IAdminState = {
  mainCategories: [],
  subCategories: [],
  readings: [],
  food: {
    categories: [],
    byCategory: [],
    nutrients: [],
    chosenNutrients: [],
  },
};
//TODO: Fit categories for readings in one object for store.
