import { createAction, props } from '@ngrx/store';
import { Readings } from '../../@core/enums/reading.category';

export const LOAD_LATEST_READINGS = '[pages] load latest readings';
export const LOAD_LATEST_READING_SUCCESS =
  '[pages] load latest reading success';

export const LOAD_GROUP_CONTENT = '[pages] load group content';
export const LOAD_GROUP_CONTENT_SUCCESS = '[pages] load group content success';

export const loadLatestReadings = createAction(LOAD_LATEST_READINGS);
export const loadLatestReadingSuccess = createAction(
  LOAD_LATEST_READING_SUCCESS,
  props<{ latestReadings: any }>()
);

export const loadGroupContent = createAction(
  LOAD_GROUP_CONTENT,
  props<{ group: Readings }>()
);

export const loadGroupContentSuccess = createAction(
  LOAD_GROUP_CONTENT_SUCCESS,
  props<{content:any[],hasChildren:boolean}>()
)
