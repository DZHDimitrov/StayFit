import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NbCheckboxModule, NbMenuService, NbRadioModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AUTH_STATE_NAME } from './state/auth.selector';
import { AuthReducer } from './state/auth.reducer';

const NB_MODULES = [NbRadioModule, NbCheckboxModule];

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature(),
    RouterModule.forChild(routes),
    ...NB_MODULES,
  ],
  providers: [],
})
export class AuthModule {}
