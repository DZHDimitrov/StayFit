import { Injectable } from "@angular/core";

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { Store } from "@ngrx/store";

import { Observable } from "rxjs";

import { map} from "rxjs/operators";

import { IAppState } from "src/app/state/app.state";

import { isAuthenticated } from "../../@auth/state/auth.selector";

import { AccountService } from "../backend/services/account.service";

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate {
    constructor(private store:Store<IAppState>,private router:Router,private accountService:AccountService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let url: string = state.url;
        return this.checkLogin(url);

    }

    checkLogin(url: string): Observable<boolean> {
        return this.store.select(isAuthenticated).pipe(
            map(isAuthenticated => {
                this.accountService.redirectAfterLogin = url;
                if (!isAuthenticated) {
                    this.router.navigate(['account','login']);
                    return false;
                }
                return true;
            })
        )
      }

}