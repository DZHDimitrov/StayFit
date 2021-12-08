import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KnowledgeComponent } from './knowledge/knowledge.component';

const routes: Routes = [
  {
    path: 'knowledge',
    component: KnowledgeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
