export interface IAddFood {
    description:string;
    foodTypeId:number;
    calories:number;
    image:any;
    foodCategoryId:number;
}


export interface IEditFood {
    calories?: number;
    nutrients: IEditNutrientData[];
    subNutrients: IEditSubNutrientData[];

}

export interface IEditNutrientData {
    id: number;
    quantity: number;
}

export interface IEditSubNutrientData {
    id: number;
    quantity:number;
}