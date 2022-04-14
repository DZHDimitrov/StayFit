import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from './panel/panel.component';
import { PagesModule } from '../@pages/pages.module';
import { FoodsModule } from '../@pages/foods/foods.module';
import { ReadingsModule } from '../@pages/readings/readings.module';
import { RolesTableComponent } from './roles-table/roles-table.component';
import { AdminEffects } from './store/admin.effects';
import { EffectsModule } from '@ngrx/effects';
import { UserRolesComponent } from './user-roles/user-roles.component';

@NgModule({
  declarations: [
    PanelComponent,
    RolesTableComponent,
    UserRolesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    PagesModule,
    FoodsModule,
    ReadingsModule,
    EffectsModule.forFeature([AdminEffects]),
    // ReactiveFormsModule,
  ],
})
export class AdminModule {}
