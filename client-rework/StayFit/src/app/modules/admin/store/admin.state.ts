export interface IAdminState {
  mainCategories: any[];
  subCategories: any[];
  readings: any[];
}

export const InitialState: IAdminState = {
  mainCategories: [],
  subCategories: [],
  readings: [],
};
