import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { KnowledgeComponent } from './knowledge.component';
import { ReadingComponent } from './reading/reading.component';

const routes:Routes = [
  {
    path: 'articles/:subCategory',
    component: ReadingComponent,
  },
  {
    path: ':mainCategory',
    component: CatalogueComponent,
  },
  {
    path: ':mainCategory/:subCategory',
    component: CatalogueComponent,
  },
  {
    path: ':mainCategory/:subCategory/:id',
    component: ReadingComponent,
  },
  {
    path: '',
    component: KnowledgeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KnowledgeRoutingModule {}
