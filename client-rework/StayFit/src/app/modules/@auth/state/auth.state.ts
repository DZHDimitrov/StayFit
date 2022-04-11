import { User } from '../user.model';

export interface IAuthState {
  user: User | null;
  isDiaryOwner:boolean | null;
  requestedURL:string | null;
}

export const initialState: IAuthState = {
  user: null,
  isDiaryOwner: null,
  requestedURL: null,
};
