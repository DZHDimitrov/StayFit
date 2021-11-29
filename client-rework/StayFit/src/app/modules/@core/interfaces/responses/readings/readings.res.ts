interface IBaseReading {
    id: number,
    title: string,
}

export interface IReadingData {
    readings: IReading[],
}

export interface IReading extends IBaseReading {
    content: string,
    searchName: string,
    imageUrl: string,
}

export interface ICreateReadingRes extends IBaseReading {
    id: number;
    title: string;
}

export interface IDeleteReading extends IBaseReading{
    id: number;
    title: string;
}

export interface IReadingSubcategoryData {
    readingsSubCategories: IReadingSubcategory[];
}

export interface IReadingSubcategory {
    name: string;
    imageUrl: string;
}