export interface IReading {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
}

export interface IReadingForEdit extends IReading {
  mainCategoryId: number;
  subCategoryId?: number;
}

export interface IEditReadingRequest {
  readingmaincategoryid: number;
  title: string;
  imageurl: string;
  content: string;
  readingsubcategoryid?: number;
}

export interface ICreateReadingRequest {
  readingmaincategoryid: number;
  title: string;
  imageurl: string;
  content: string;
  readingsubcategoryid?: number;
}

export interface ICreateReadingResponse {
  id: number;
  title: string;
}

export interface IDeleteReadingResponse {
  id: number;
  title: string;
}
