import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
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

const API = [
  ReadingsApi,
  PostApi,
  CommentsApi,
  VotesApi,
  FoodsApi,
  HttpService
]
const SERVICES = [
  ReadingsService,
  PostsService,
  CommentsService,
  FoodsService,
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
