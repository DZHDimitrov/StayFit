import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('./modules/@pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./modules/@auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: HomeComponent,
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
