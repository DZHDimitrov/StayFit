import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
    {
        path: '',
        component: CategoriesComponent
    },
    {
      path:':id',
      component: CatalogueComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodsRoutingModule {}
