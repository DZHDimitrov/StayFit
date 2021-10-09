import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeNavigationComponent } from './shared/knowledge-navigation/knowledge-navigation.component';
import { KnowledgeRoutingModule } from './knowledge.routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { KnowledgeMainComponent } from './knowledge-main/knowledge-main.component';
import { NbCardModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { PaginatedArticlesComponent } from './knowledge-main/pages/paginated-articles/paginated-articles.component';
import { SingleArticleComponent } from './knowledge-main/pages/single-article/single-article.component';
import { ArticleComponent } from './shared/article/article.component';



@NgModule({
  declarations: [
    KnowledgeNavigationComponent,
    KnowledgeMainComponent,
    PaginatedArticlesComponent,
    SingleArticleComponent,
    ArticleComponent,
  ],
  imports: [
    CommonModule,
    KnowledgeRoutingModule,
    LayoutModule,
    NbIconModule,
    NbSpinnerModule,
    NbCardModule,
  ]
})
export class KnowledgeModule { }
