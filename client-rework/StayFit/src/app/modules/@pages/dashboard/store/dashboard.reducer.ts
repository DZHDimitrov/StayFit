import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { loadTasks, loadTasksSuccess, removeTask } from './dashboard.actions';
import { initialState } from './dashboard.state';

const _dashboardReducer = createReducer(
  initialState,
  on(loadTasksSuccess, (state, { payload }) => {
    return {
      ...state,
      tasks: payload.tasks,
    };
  }),
  on(removeTask, (state, { payload }) => {
    return {
      ...state,
      tasks: state.tasks.filter((t) => t.id !== payload.taskId),
    };
  })
);

export const DashboardReducer = function (state, action) {
  return _dashboardReducer(state, action);
};
