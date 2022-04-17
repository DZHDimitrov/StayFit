export interface ITask {
    id:number;
    name:string;
    description:string;
}

export interface ITaskDisplay extends ITask {
    buttonText:string;
    icon:string;
    path?:string;
    action?:string;
}