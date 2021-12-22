import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'knowledge',
    loadChildren: () =>
      import('./knowledge/knowledge.module').then((m) => m.KnowledgeModule),
  },
  {
    path: 'foods',
    loadChildren: () =>
      import('./foods/foods.module').then((m) => m.FoodsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
