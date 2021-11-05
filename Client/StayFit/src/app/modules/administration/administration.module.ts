import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewFoodComponent } from './create-new-food/create-new-food.component';
import { AdministrationRoutingModule } from './administration.routing.module';
import { NbButtonModule, NbCardModule, NbInputModule, NbListModule, NbSelectModule, NbSpinnerModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';

const NB_MODULES = [
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbListModule,
  NbButtonModule,
  NbSpinnerModule,
]

@NgModule({
  declarations: [
    CreateNewFoodComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    ...NB_MODULES
  ],
})
export class AdministrationModule { }
