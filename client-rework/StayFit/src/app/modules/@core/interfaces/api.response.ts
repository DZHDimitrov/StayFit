export interface IApiResponse<T> {
    Errors: any[],
    data: T,
    isOk: boolean,
}