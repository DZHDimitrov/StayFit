export interface IRegisterRequest {
    email: string,
    username: string,
    password: string,
    confirmpassword: string,
    gender: string,
}

export interface ILoginRequest {
    username: string,
    password: string,
}

export interface ILoginResponse {
    id: string,
    username: string,
    email: string,
    gender: string,
    access_token: string,
}

export interface IRegisterResponse {
    id: string,
}