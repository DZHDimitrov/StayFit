import { createHTTPActions } from "../../@core/utility/store-actions.helper";
import { IModifyRoleRequest } from "../models/admin-requests.model";

import { IRole } from "../models/roles.model";

import { IUserInRole } from "../models/usersInRole.model";

export const [loadRoles,loadRolesSuccess,loadRolesFailure] =
createHTTPActions<{},{roles:IRole[]},{error?:string}>('[admin] load roles');

export const [loadUsersInRole,loadUsersInRoleSuccess,loadUsersInRoleFailure] =
createHTTPActions<{roleId:string},{usersInRole:IUserInRole[]},{}>('[admin] load usersInRole');

export const [modifyRole,modifyRoleSuccess,modifyRoleFailure] =
createHTTPActions<{roleId:string,data:IModifyRoleRequest},{modifiedId:string,toAdd:boolean},{}>('[admin] modify role');

export const [removeRole,removeRoleSuccess,removeRoleFailure] =
createHTTPActions<{roleId:string},{roleId:string},{}>('[admin] remove role');


