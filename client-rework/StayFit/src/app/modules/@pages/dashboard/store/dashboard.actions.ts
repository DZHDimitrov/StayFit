import { createHTTPActions } from "src/app/modules/@core/utility/store-actions.helper";
import { ITask } from "../models/dashboard-task.model";

export const [loadTasks,loadTasksSuccess] =
createHTTPActions<{},{tasks:ITask[]}>('[dashboard] tasks');

export const [removeTask] =
createHTTPActions<{taskId:number}>('[dashboard] remove task');