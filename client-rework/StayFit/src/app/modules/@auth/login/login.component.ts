import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { IAppState } from 'src/app/state/app.state';
import { setLoadingSpinner } from '../../shared/state/shared.actions';
import { loginStart } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userLoginForm!: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<IAppState>,private toastr:ToastrService) {}

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

    this.store.dispatch(loginStart({ username, password }));
  }

  get controls() {
    return this.userLoginForm.controls;
  }
}
