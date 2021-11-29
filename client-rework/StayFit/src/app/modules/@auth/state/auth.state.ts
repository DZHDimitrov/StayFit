import { User } from "../user.model";

export interface IAuthState {
    user: User | null,
};

export const initialState: IAuthState = {
    user:null,
};