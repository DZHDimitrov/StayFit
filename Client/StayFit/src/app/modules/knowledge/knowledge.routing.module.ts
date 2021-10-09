import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KnowledgeMainComponent } from './knowledge-main/knowledge-main.component';
import { PaginatedArticlesComponent } from './knowledge-main/pages/paginated-articles/paginated-articles.component';
import { SingleArticleComponent } from './knowledge-main/pages/single-article/single-article.component';

const routes: Routes = [
  {
    path:'articles',
    component: PaginatedArticlesComponent,
  },
  {
    path:'articles/:id',
    component: SingleArticleComponent,
  },
  {
    path: '',
    component: KnowledgeMainComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowledgeRoutingModule { }