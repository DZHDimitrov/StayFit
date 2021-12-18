import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewReadingComponent } from './new-reading/new-reading.component';

const routes: Routes = [
  {
    path: 'new-reading',
    component: NewReadingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}