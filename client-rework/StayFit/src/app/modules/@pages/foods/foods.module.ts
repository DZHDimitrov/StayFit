import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { FoodsRoutingModule } from './foods-routing.module';
import { MaterialModule } from '../../material/material.module';
import { ComponentsModule } from '../../@components/components.module';
import { EffectsModule } from '@ngrx/effects';
import { FoodsEffects } from './store/foods.effects';
import { CatalogueComponent } from './catalogue/catalogue.component';



@NgModule({
  declarations: [
    CategoriesComponent,
    CatalogueComponent
  ],
  imports: [
    CommonModule,
    FoodsRoutingModule,
    MaterialModule,
    ComponentsModule,
    EffectsModule.forFeature([FoodsEffects])
  ]
})
export class FoodsModule { }
