export interface IApiResponse<T> {
    errors: any[],
    data: T,
    isOk: boolean,
}