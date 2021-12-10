interface IBaseReading {
  id: number;
  title: string;
}

export interface IReading extends IBaseReading {
  content: string;
  searchName: string;
  imageURL: string;
}

export interface IReadingPreview extends IBaseReading {
  content:string;
  searchName:string;
  imageURL:string;
}

export interface ICreateReadingRes extends IBaseReading {
  id: number;
  title: string;
}

export interface IDeleteReading extends IBaseReading {
  id: number;
  title: string;
}

export interface IReadingCategory {
  name: string;
  imageUrl: string;
}

export interface ILatestCategoryReadings {
  name: string;
  readings: {
    searchTitle: string;
    title: string;
    imageURL: string;
  }[];
}
