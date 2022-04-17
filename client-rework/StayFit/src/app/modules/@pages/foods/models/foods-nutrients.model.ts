export interface INutrient {
  id: number;
  name: string;
  quantity?: number;
  subNutrients: ISubNutrient[];
}

export interface ISubNutrient {
  id: number;
  name: string;
  quantity?: any;
}
