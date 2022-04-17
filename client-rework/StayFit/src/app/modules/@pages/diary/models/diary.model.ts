export interface INote {
    id:number;
    mood:string;
    activity:string;
    nutrition:string;
    other:string;
    sleepHours:string;
    isModified:boolean;
    isActive:boolean;
    createdOn?:string;
}

export interface INoteRequest {
    activity:string;
    mood:string;
    nutrition:string;
    other:string;
    sleepHours:string;
}