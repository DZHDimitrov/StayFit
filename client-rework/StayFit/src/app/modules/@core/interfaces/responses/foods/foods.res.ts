export interface IAddFoodRes {
  id: number;
  foodName: string;
}

export interface IFoodCategory {
  id: number;
  name: string;
  imageUrl: string;
}

export interface IFoodPreview {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  foodNameId?: number;
  category?: string;
}

export interface IFood {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  calories: number;
  nutrients:INutrient[];
}

interface INutrient {
  id:number;
  name:string;
  quantity?:number;
  subNutrients:ISubNutrient[]
}

interface ISubNutrient {
  name: string;
  quantity?: any;
}
