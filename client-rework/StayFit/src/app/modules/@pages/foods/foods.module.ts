import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { FoodsRoutingModule } from './foods-routing.module';
import { MaterialModule } from '../../material/material.module';
import { ComponentsModule } from '../../@components/components.module';
import { EffectsModule } from '@ngrx/effects';
import { FoodsEffects } from './store/foods.effects';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { FoodDetailsComponent } from './food-details/food-details.component';
import { NewFoodComponent } from './new-food/new-food.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditFoodComponent } from './edit-food/edit-food.component';



@NgModule({
  declarations: [
    CategoriesComponent,
    CatalogueComponent,
    FoodDetailsComponent,
    NewFoodComponent,
    EditFoodComponent,
    EditFoodComponent,
  ],
  imports: [
    CommonModule,
    FoodsRoutingModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([FoodsEffects])
  ],
  exports: [
    NewFoodComponent,
  ]
})
export class FoodsModule { }
