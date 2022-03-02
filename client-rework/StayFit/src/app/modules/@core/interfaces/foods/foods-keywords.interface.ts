export interface IFoodKeyword {
    id?:number;
    name?:string;
    category?:string;
    description?:string;
}

export interface IFoodKeywordAutocomplete extends IFoodKeyword {
    searchName:string;
}
