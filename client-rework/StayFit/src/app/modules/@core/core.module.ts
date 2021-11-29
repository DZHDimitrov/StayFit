import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonBackendModule } from './backend/common-backend.module';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { HttpClientModule } from '@angular/common/http';

export const NB_CORE_PROVIDERS = [
  ...CommonBackendModule.forRoot().providers 
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }

 }
