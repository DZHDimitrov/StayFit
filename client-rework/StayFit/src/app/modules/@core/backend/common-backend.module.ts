import { ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { HttpService } from './api/http.service';

import { ReadingsApi } from './api/readings.api';

import { ReadingsService } from './services/readings.service';

import { PostApi } from './api/posts.api';

import { PostsService } from './services/posts.service';

import { CommentsApi } from './api/comments.api';

import { CommentsService } from './services/comments.service';

import { VotesApi } from './api/votes.api';

import { FoodsApi } from './api/foods.api';

import { FoodsService } from './services/foods.service';

import { DiaryApi } from './api/diary.api';

import { DiaryService } from './services/diary.service';

import { DashboardApi } from './api/dashboard.api';

import { DashboardService } from './services/dashboard.service';

import { ProgressApi } from './api/progress.api';

import { ProgressService } from './services/progress.service';
import { UserApi } from './api/user.api';
import { UserService } from './services/user.service';

const API = [
  ReadingsApi,
  PostApi,
  CommentsApi,
  VotesApi,
  FoodsApi,
  DiaryApi,
  DashboardApi,
  ProgressApi,
  UserApi,
  HttpService
]
const SERVICES = [
  ReadingsService,
  PostsService,
  CommentsService,
  FoodsService,
  DiaryService,
  DashboardService,
  ProgressService,
  UserService,
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CommonBackendModule {
  public static forRoot(): ModuleWithProviders<CommonBackendModule> {
    return  {
      ngModule: CommonBackendModule,
      providers: [...API,...SERVICES]
    }
  }
 }
