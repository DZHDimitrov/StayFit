import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { Title } from '@angular/platform-browser';

import { Store } from '@ngrx/store';

import { IAppState } from 'src/app/state/app.state';

import { ILoginRequest } from '../models/login.model';

import { login } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private titleSevice: Title
  ) {
    this.titleSevice.setTitle('Login');
  }

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  submit() {
    const username: any = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    const data: ILoginRequest = {
      username,
      password,
    };

    this.store.dispatch(login({ data }));
  }
}
