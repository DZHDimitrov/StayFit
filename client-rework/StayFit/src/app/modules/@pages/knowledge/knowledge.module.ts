import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeRoutingModule } from './knowledge-routing.module';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ReadingComponent } from './reading/reading.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../@components/components.module';
import { MaterialModule } from '../../material/material.module';
import { KnowledgeComponent } from './knowledge.component';
import { EffectsModule } from '@ngrx/effects';
import { PagesEffects } from './store/knowledge.effects';
import { ComponentsEffects } from '../../@components/state/components.effects';



@NgModule({
  declarations: [CatalogueComponent,ReadingComponent,KnowledgeComponent],
  imports: [
    CommonModule,
    KnowledgeRoutingModule,
    ComponentsModule,
    MaterialModule,
    EffectsModule.forFeature([PagesEffects,ComponentsEffects]),
  ]
})
export class KnowledgeModule { }
