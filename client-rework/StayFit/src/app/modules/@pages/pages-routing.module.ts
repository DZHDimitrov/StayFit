import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../@components/page-not-found/page-not-found.component';

import { AuthGuard } from '../@core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'readings',
    loadChildren: () =>
      import('./readings/readings.module').then((m) => m.ReadingsModule),
  },
  {
    path: 'foods',
    loadChildren: () =>
      import('./foods/foods.module').then((m) => m.FoodsModule),
  },
  {
    path: 'diary',
    loadChildren: () =>
      import('./diary/diary.module').then((m) => m.DiaryModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'progress',
    loadChildren: () =>
      import('./progress/progress.module').then((m) => m.ProgressModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
