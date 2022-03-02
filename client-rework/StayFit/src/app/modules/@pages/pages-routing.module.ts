import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'readings',
    loadChildren: () => import('./readings/readings.module').then((m) => m.ReadingsModule)
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
