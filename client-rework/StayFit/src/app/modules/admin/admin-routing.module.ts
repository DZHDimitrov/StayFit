import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewFoodComponent } from './new-food/new-food.component';
import { NewReadingComponent } from './new-reading/new-reading.component';

const routes: Routes = [
  {
    path: 'new-reading',
    component: NewReadingComponent,
  },
  {
    path:'new-food',
    component: NewFoodComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
