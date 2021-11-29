import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/@core/core.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbMenuModule,
  NbButtonModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from './modules/@theme/theme.module';
import { AuthInterceptor } from './modules/@auth/interceptors/auth.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { SharedModule } from './modules/shared/shared.module';
import { appReducer } from './state/app.state';
import { AuthEffects } from './modules/@auth/state/auth.effects';
const NB_MODULES = [
  NbThemeModule.forRoot({ name: 'default' }),
  NbMenuModule.forRoot(),
  NbLayoutModule,
  NbEvaIconsModule,
  NbButtonModule,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    HttpClientModule,
    NoopAnimationsModule,
    ThemeModule,
    SharedModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    ...NB_MODULES,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
