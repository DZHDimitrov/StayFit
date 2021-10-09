import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewFoodComponent } from './create-new-food/create-new-food.component';

const routes: Routes = [
    {
        path: 'add-food',
        component: CreateNewFoodComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }