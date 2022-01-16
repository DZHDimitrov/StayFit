import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReadingsRoutingModule } from './readings-routing.module';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ReadingComponent } from './reading/reading.component';
import { ComponentsModule } from '../../@components/components.module';
import { MaterialModule } from '../../material/material.module';
import { ReadingsComponent } from './readings.component';
import { EffectsModule } from '@ngrx/effects';
import { PagesEffects } from './store/readings.effects';
import { ComponentsEffects } from '../../@components/state/components.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogueService } from './services/catalogue.service';
import { NewReadingComponent } from './new-reading/new-reading.component';

@NgModule({
  declarations: [CatalogueComponent,ReadingComponent,ReadingsComponent,NewReadingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReadingsRoutingModule,
    ComponentsModule,
    MaterialModule,
    EffectsModule.forFeature([PagesEffects,ComponentsEffects]),
  ],
  exports:[NewReadingComponent],
  providers:[CatalogueService]
})
export class ReadingsModule { }
