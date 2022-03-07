import { User } from '../user.model';

export interface IAuthState {
  user: User | null;
  isDiaryOwner:boolean | null;
  errorMessage: string;
}

export const initialState: IAuthState = {
  user: null,
  isDiaryOwner: null,
  errorMessage: '',
};
