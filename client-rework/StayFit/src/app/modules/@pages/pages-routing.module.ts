import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadingSubCategory } from '../@core/enums/reading.category';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { ReadingComponent } from './reading/reading.component';

const routes: Routes = [
  {
    path: 'knowledge',
    component: KnowledgeComponent,
  },
  {
    path: 'articles/:subCategory',
    component:ReadingComponent
  },
  {
    path: ':mainCategory',
    component: CatalogueComponent,
  },
  {
    path:':mainCategory/:subCategory',
    component:CatalogueComponent,
  },
  {
    path:':mainCategory/:subCategory/:id',
    component:ReadingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
