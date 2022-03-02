export interface IReading {
  id: number;
  title: string;
  content: string;
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
