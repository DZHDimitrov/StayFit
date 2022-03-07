import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { IAppState } from 'src/app/state/app.state';

import { ConfirmedValidator } from '../../@core/utility/validators/form-validator';

import { registerStart } from '../state/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userRegisterForm!: FormGroup;

  get controls() {
    return this.userRegisterForm.controls;
  }

  constructor(private fb: FormBuilder, private store: Store<IAppState>) {
    this.initForm();
  }

  ngOnInit(): void {}

  submit() {
    if (!this.userRegisterForm.valid) {
      Object.keys(this.userRegisterForm.controls).forEach((key) => {
        this.userRegisterForm.controls[key].markAsTouched({ onlySelf: true });
      });
      return;
    }
    const data = {...this.userRegisterForm.value};

    this.store.dispatch(
      registerStart(data)
    );
  }

  private initForm() {
    this.userRegisterForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(4)]],
        lastName: ['', [Validators.required, Validators.minLength(4)]],
        username: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [''],
        gender: ['', Validators.required],
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }
}
