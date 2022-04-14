import { IRole } from "../models/roles.model";
import { IUserInRole } from "../models/usersInRole.model";

export interface IAdminState {
    roles:IRole[];
    usersInRole:IUserInRole[];
}

export const InitialState: IAdminState = {
    roles:[],
    usersInRole:[],
};
