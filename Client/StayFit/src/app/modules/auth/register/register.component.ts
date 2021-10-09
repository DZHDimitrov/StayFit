import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegisterRequest } from 'src/app/shared/interfaces/AuthRequests';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userRegisterForm!: FormGroup;

  constructor(private userService: UserService,private router: Router,private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.userRegisterForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmpassword: new FormControl(''),
      gender: new FormControl(''),
    });
  }

  registerHandler(event:any) {
    // const {firstname,lastname,username,email,password,confirmpassword,gender} = this.userRegisterForm.value;
    // const userRegisterRequest: IRegisterRequest = {
    //   email,
    //   password,
    //   confirmpassword,
    //   gender,
    //   username,
    // }
    const a = {
      email:"ddreamz2@abv.bg",
      username:"SuperAdmin3",
      password:"123456",
      confirmpassword:"123456",
      gender:"male"
    }
    this.httpClient.post('https://localhost:44333/api/users/register',a).subscribe(x=> console.log(x));
    // this.userService.register(userRegisterRequest).subscribe(x => this.router.navigate(['/']));
  }
}
