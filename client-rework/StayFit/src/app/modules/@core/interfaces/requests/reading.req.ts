export interface ICreateReadingRequest {
    readingmaincategoryid:number;
    title:string;
    imageurl:string;
    content:string;
    readingsubcategoryid?:number;
    bodypartid?: number;
}