export interface IFoodCategoryRes {
    foodCategories: IFoodCategory[];
}

interface IFoodCategory {
    id: number;
    name: string;
    imageUrl: string;
}

export interface IAddFoodRes {
    id: number;
    foodName: string;
}