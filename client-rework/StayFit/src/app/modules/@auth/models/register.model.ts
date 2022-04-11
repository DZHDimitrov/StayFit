export interface IRegisterRequest {
    firstName:string;
    lastName:string;
    email:string;
    username:string;
    password:string;
    gender:string;

}

export interface IRegisterResponse {
    _id:string;
}