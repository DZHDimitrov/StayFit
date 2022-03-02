import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ReadingsRoutingModule } from './readings-routing.module';

import { ReadingComponent } from './reading/reading.component';

import { ComponentsModule } from '../../@components/components.module';

import { MaterialModule } from '../../material/material.module';

import { ReadingsComponent } from './readings.component';

import { EffectsModule } from '@ngrx/effects';

import { PagesEffects } from './store/readings.effects';

import { ComponentsEffects } from '../../@components/state/components.effects';

import { ReactiveFormsModule } from '@angular/forms';

import { NewReadingComponent } from './new-reading/new-reading.component';

import { MainCategoriesComponent } from './main-categories/main-categories.component';

import { SubCategoriesComponent } from './sub-categories/sub-categories.component';

import { KnowledgeComponent } from './knowledge/knowledge.component';

@NgModule({
  declarations: [
    ReadingComponent,
    ReadingsComponent,
    NewReadingComponent,
    MainCategoriesComponent,
    SubCategoriesComponent,
    KnowledgeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReadingsRoutingModule,
    ComponentsModule,
    MaterialModule,
    EffectsModule.forFeature([PagesEffects, ComponentsEffects]),
  ],
  exports: [NewReadingComponent],
  providers: [],
})
export class ReadingsModule {}
