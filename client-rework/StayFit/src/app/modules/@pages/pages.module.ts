import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { NbMenuModule } from '@nebular/theme';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { ComponentsModule } from '../@components/components.module';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [KnowledgeComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NbMenuModule,
    ComponentsModule,
    MaterialModule,
    EffectsModule.forFeature(),
  ],
})
export class PagesModule {}
