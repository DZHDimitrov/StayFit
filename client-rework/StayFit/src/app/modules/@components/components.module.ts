import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniNavbarComponent } from './mini-navbar/mini-navbar.component';
import { ReadingBlockComponent } from './reading-preview/reading-preview.component';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FoodsIntroComponent } from './foods-intro/foods-intro.component';
import { SendQuestionComponent } from './send-question/send-question.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    MiniNavbarComponent,
    ReadingBlockComponent,
    SearchBarComponent,
    SearchBarComponent,
    FoodsIntroComponent,
    SendQuestionComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    EffectsModule.forFeature(),
  ],
  exports: [
    MiniNavbarComponent,
    ReadingBlockComponent,
    SearchBarComponent,
    FoodsIntroComponent,
    SendQuestionComponent,
    PageNotFoundComponent,
  ],
  providers: [],
})
export class ComponentsModule {}
