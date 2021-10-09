export interface IFoodCategory {
    id: number,
    name: string,
    imageUrl: string,
}
export interface IFoodType {
    id: number;
    name: string;
}

export interface INutrient {
    name: string;
    nutrientTypes: string[],
}

export interface INutrientType {
    name: string;
    quantity?: number | null;
}

export interface INewFoodPost {
    description:string;
    foodTypeId:number;
    calories:number;
    imageurl: string;
    foodCategoryId:number;
    carbohydrates:INutrientType[],
    vitamins:INutrientType[],
    sterols:INutrientType[],
    mores:INutrientType[],
    minerals:INutrientType[],
    fats:INutrientType[],
    aminoacids:INutrientType[],
}