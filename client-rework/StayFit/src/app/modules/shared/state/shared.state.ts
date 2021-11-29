export interface ISharedState {
    showLoading: boolean;
    errorMessage: string;
}

export const initialState: ISharedState = {
    showLoading: false,
    errorMessage: ''
}