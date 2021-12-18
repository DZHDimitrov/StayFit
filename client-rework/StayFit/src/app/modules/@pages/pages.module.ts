import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { NbMenuModule } from '@nebular/theme';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { ComponentsModule } from '../@components/components.module';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material/material.module';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { PagesEffects } from './store/pages.effects';
import { ComponentsEffects } from '../@components/state/components.effects';
import { ReadingComponent } from './reading/reading.component';

@NgModule({
  declarations: [KnowledgeComponent, CatalogueComponent, ReadingComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    MaterialModule,
    EffectsModule.forFeature([PagesEffects,ComponentsEffects]),
  ],
})
export class PagesModule {}
