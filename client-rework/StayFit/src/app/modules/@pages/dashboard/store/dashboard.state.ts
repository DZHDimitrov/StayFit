import { ITask } from "../models/dashboard-task.model";

export interface IDashboardState {
  tasks: ITask[];
}

export const initialState: IDashboardState = {
  tasks: [],
};
