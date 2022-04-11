import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Title } from '@angular/platform-browser';

import { Store } from '@ngrx/store';

import { IAppState } from 'src/app/state/app.state';

import { ConfirmedValidator } from '../../@core/utility/validators/form-validator';

import { register } from '../state/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private titleService: Title
  ) {
    this.initForm();
    this.titleService.setTitle("Register")
  }

  registerForm!: FormGroup;

  get gender() {
    return this.registerForm.get("gender");
  }

  ngOnInit(): void {}

  submit() {
    if (!this.registerForm.valid) {
      Object.keys(this.registerForm.controls).forEach((key) => {
        this.registerForm.controls[key].markAsTouched({ onlySelf: true });
      });
      return;
    }
    const data = { ...this.registerForm.value };

    this.store.dispatch(register({data}));
  }

  private initForm() {
    this.registerForm = this.fb.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(40),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(40),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(50),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: [''],
        gender: ['', Validators.required],
      },
      {
        validator: ConfirmedValidator('confirmPassword', 'password'),
      }
    );
  }
}
