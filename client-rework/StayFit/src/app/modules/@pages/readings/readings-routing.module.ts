import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ReadingsComponent } from './readings.component';
import { ReadingComponent } from './reading/reading.component';

const routes:Routes = [
  {
    path: 'articles/:subCategory',
    component: ReadingComponent,
  },
  // {
  //   //TODO: Admin only!
  //   path:'create',
  //   component:NewReadingComponent
  // },
  {
    path: ':mainCategory',
    component:CatalogueComponent,
    // children: [
    //   {
    //     path:':subCategory',
    //     component:CatalogueComponent,
    //     // children: [
    //     //   {
    //     //     path:':id',
    //     //     component: ReadingComponent
    //     //   }
    //     // ]
    //   },
    //   {
    //     path:':subCategory/:id',
    //     component:ReadingComponent
    //   }
    // ]
  },
  {
    path: ':mainCategory/:subCategory',
    component:CatalogueComponent,
  },
  {
    path:':mainCategory/:subCategory/:id',
    component:ReadingComponent,
  },
  {
    path:'',
    component:ReadingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadingsRoutingModule {}
