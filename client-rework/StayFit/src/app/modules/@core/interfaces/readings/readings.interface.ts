import { IHaveId, IHaveName } from './readings.base.interface';

export interface ICategoryReadingPreviews extends IHaveName {
  hasChildren: boolean;
  isRoot: boolean;
  categories: any[];
  previews: IReadingPreview[];
}

export interface IReadingPreview extends IHaveId<number>, IHaveName {
  mainCategoryName: string;
  imageUrl: string;
  hasChildren: boolean;
}

export interface IReading extends IHaveId<number> {
  title: string;
  content: string;
  searchTitle: string;
  imageUrl: string;
}

export interface IMainCategory extends IHaveId<number>,IHaveName {
  hasChildren: boolean;
  //Remove searchName if not needed in future. ??
}

export interface ISubCategory extends IHaveId<number>,IHaveName {
  //Remove searchName if not needed in future. ??
  imageUrl: string;
}

export interface ICreateReadingRes extends IHaveId<number> {
  title: string;
}

export interface IDeleteReading extends IHaveId<number> {
  title: string;
}
