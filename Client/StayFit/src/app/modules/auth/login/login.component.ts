import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginRequest } from 'src/app/shared/interfaces/AuthRequests';
import { IUser } from 'src/app/shared/interfaces/User';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userLoginForm!: FormGroup;
  userLoginRequest!: ILoginRequest;

  isChecked:boolean = true;

  constructor(
    private userService: UserService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.userLoginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    }); 
  }

  loginHandler() {
    const { username, password } = this.userLoginForm.value;
    this.userLoginRequest = {
      username: username,
      password: password,
    };
    this.userService.login(this.userLoginRequest).subscribe(res => {
      this.userService.User = res;
      localStorage.setItem('authToken',res.access_token);
      this.router.navigate(['/'])},
      err => {console.log('Hello')},
    )
  }
}


