export interface IFoodCategory {
    id: number;
    name: string;
    searchName: string;
    imageUrl: string;
}

export interface ISearchedFood {
    id: number;
    foodNameId: number;
    name: string;
    description: string;
    category: string;
}

export interface IAddFoodRes {
    id: number;
    foodName: string;
}