import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { CatalogueComponent } from './catalogue/catalogue.component';

import { CategoriesComponent } from './categories/categories.component';

import { FoodDetailsComponent } from './food-details/food-details.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
  },
  {
    path: 'id/:id',
    component: FoodDetailsComponent,
  },
  {
    path: ':category',
    component: CatalogueComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodsRoutingModule {}
