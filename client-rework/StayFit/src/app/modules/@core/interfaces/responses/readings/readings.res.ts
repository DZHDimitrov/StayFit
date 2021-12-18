export interface ICategoryReadingPreviews {
  name:string;
  searchName:string;
  hasChildren:boolean;
  isRoot:boolean;
  categories:any[];
  previews:IReadingPreview[];
}

export interface IReadingPreview {
  id:number;
  name:string;
  mainCategoryName:string;
  searchName:string;
  imageUrl:string;
  hasChildren:boolean;
}

export interface IReading {
  id:number;
  title:string;
  content: string;
  searchTitle: string;
  imageUrl: string;
}

export interface ICreateReadingRes {
  id: number;
  title: string;
}

export interface IDeleteReading {
  id: number;
  title: string;
}
