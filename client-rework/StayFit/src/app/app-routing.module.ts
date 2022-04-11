import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './modules/@core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'pages',
        loadChildren: () =>
          import('./modules/@pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./modules/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path:'',
        component: HomeComponent
      }
    ],
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./modules/@auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
