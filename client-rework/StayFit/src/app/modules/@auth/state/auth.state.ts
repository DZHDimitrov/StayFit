import { User } from '../user.model';

export interface IAuthState {
  user: User | null;
  errorMessage: string;
}

export const initialState: IAuthState = {
  user: null,
  errorMessage: '',
};
