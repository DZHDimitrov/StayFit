import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ReadingsComponent } from './readings.component';

import { ReadingComponent } from './reading/reading.component';

import { MainCategoriesComponent } from './main-categories/main-categories.component';

import { KnowledgeComponent } from './knowledge/knowledge.component';

import { SubCategoriesComponent } from './sub-categories/sub-categories.component';

import { EditReadingComponent } from './edit-reading/edit-reading.component';

const routes: Routes = [
  {
    path: '',
    component: ReadingsComponent,

    children: [
      {
        path: 'statii/:id',
        component: ReadingComponent,
      },
      {
        path: 'statii/:id/edit',
        component: EditReadingComponent,
      },
      {
        path: "r'ukovodstvo/:id",
        component: ReadingComponent,
      },
      {
        path: "r'ukovodstvo/:id/edit",
        component: EditReadingComponent,
      },
      {
        path: ':mainCategory',
        component: MainCategoriesComponent,
      },
      {
        path: ':mainCategory/:subCategory',
        component: SubCategoriesComponent,
      },
      {
        path: ':mainCategory/:subCategory/:id',
        component: ReadingComponent,
      },
      {
        path: ':mainCategory/:subCategory/:id/edit',
        component: EditReadingComponent,
      },
      {
        path: '',
        component: KnowledgeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadingsRoutingModule {}
