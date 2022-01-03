import {
  ICategoryReadingPreview,
  IMainCategory,
  IReading,
  IReadingPreview,
  ISubCategory,
} from 'src/app/modules/@core/interfaces/responses/readings/readings.interface';

export interface ICategoryReadingPreviewData extends ICategoryReadingPreview {}

export interface IReadingPreviewData extends IReadingPreview {}

export interface IReadingData extends IReading {}

export interface IMainCategoryData extends IMainCategory {}

export interface ISubCategoryData extends ISubCategory {}