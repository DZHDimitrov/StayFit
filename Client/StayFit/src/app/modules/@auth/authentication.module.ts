import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MomentModule } from "ngx-moment";
import { LoginComponent } from "../auth/login/login.component";
import { AccountApi } from "../core/backend/api/account.api";




@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MomentModule,
  ],
  providers: [AccountApi]
})
export class AuthenticationModule { }
