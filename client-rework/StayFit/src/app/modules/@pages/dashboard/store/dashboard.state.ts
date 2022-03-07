import { ITask } from 'src/app/modules/@core/interfaces/dashboard/dashboard-task.interface';

export interface IDashboardState {
  tasks: ITask[];
}

export const initialState: IDashboardState = {
  tasks: [],
};
