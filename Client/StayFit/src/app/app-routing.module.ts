import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from './core/guards/auth.activate';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canLoad: [AuthActivate]
  },
  {
    path: 'knowledge',
    loadChildren: () => import('./modules/knowledge/knowledge.module').then(m => m.KnowledgeModule),
  },
  {
    path: 'administration',
    loadChildren: () => import('./modules/administration/administration.module').then(m => m.AdministrationModule),
  }
  // {
  //   path: 'articles',
  //   loadChildren: () => import('./modules/knowledge/knowledge.module').then(m => m.KnowledgeModule),
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
