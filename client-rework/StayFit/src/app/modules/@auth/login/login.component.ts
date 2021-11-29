import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/state/app.state';
import { ReadingsService } from '../../@core/backend/services/readings.service';
import { setLoadingSpinner } from '../../shared/state/shared.actions';
import { AuthService } from '../services/auth.service';
import { loginStart } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userLoginForm!: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  submit() {
    if (!this.userLoginForm.valid) {
      Object.keys(this.userLoginForm.controls).forEach((key) => {
        this.userLoginForm.controls[key].markAsTouched({ onlySelf: true });
      });
      return;
    }
    const username = this.userLoginForm.get('username')?.value;
    const password = this.userLoginForm.get('password')?.value;
    // this.authService.login(username,password);
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginStart({ username, password }));
  }

  get controls() {
    return this.userLoginForm.controls;
  }
}
