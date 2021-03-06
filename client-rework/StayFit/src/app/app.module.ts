import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/@core/core.module';
import {
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';
import { ThemeModule } from './modules/@theme/theme.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { SharedModule } from './modules/shared/shared.module';
import { appReducer } from './state/app.state';
import { AuthEffects } from './modules/@auth/state/auth.effects';
import { ThemeEffects } from './modules/@theme/state/theme.effects';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './modules/material/material.module';
import { HomeComponent } from './home/home.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './state/router/custome-serializer';
import { ComponentsModule } from './modules/@components/components.module';
import { FormsModule } from '@angular/forms';
import { DashboardEffects } from './modules/@pages/dashboard/store/dashboard.effects';
import { logoutClearState } from './modules/@auth/state/auth.reducer';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AuthInterceptor } from './modules/@core/interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent, HomeComponent, AppLayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
    }),
    CoreModule.forRoot(),
    HttpClientModule,
    // NoopAnimationsModule,
    ThemeModule,
    SharedModule,
    ComponentsModule,
    StoreModule.forRoot(appReducer,{metaReducers:[logoutClearState]}),
    EffectsModule.forRoot([AuthEffects, ThemeEffects,DashboardEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    MaterialModule,
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    FormsModule,
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
