import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SHARED_STATE_NAME } from './state/shared.selector';
import { SharedReducer } from './state/shared.reducer';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(SHARED_STATE_NAME,SharedReducer),
  ],
  exports: [LoadingSpinnerComponent]
})
export class SharedModule { }
