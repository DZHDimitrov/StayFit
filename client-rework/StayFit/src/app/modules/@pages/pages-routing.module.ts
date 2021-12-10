import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './knowledge/catalogue/catalogue.component';
import { KnowledgeComponent } from './knowledge/knowledge.component';

const routes: Routes = [
  {
    path: 'knowledge',
    component: KnowledgeComponent
  },
  {
    path: ':mainCategory',
    component: CatalogueComponent,
  }
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
