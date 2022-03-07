import { ITask } from "src/app/modules/@core/interfaces/dashboard/dashboard-task.interface";
import { createHTTPActions } from "src/app/modules/@core/utility/store-actions.helper";

export const [loadTasks,loadTasksSuccess] =
createHTTPActions<{},{tasks:ITask[]}>('[dashboard] tasks');

export const [removeTask] =
createHTTPActions<{taskId:number}>('[dashboard] remove task');