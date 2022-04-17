export interface IFoodCategory {
  id: number;
  name: string;
  imageUrl: string;
}

export interface IFoodCategoryNavigate extends IFoodCategory {
  searchName: string;
}
