import { Injectable } from "@angular/core";

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { Store } from "@ngrx/store";

import { Observable } from "rxjs";

import { map } from "rxjs/operators";

import { IAppState } from "src/app/state/app.state";

import { getUser } from "../../@auth/state/auth.selector";

import { Roles } from "../enums/roles";

@Injectable({
    providedIn:'root'
})
export class AdminGuard implements CanActivate {
    constructor(private store:Store<IAppState>,private router:Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select(getUser).pipe(map(user => {
            if (!user?.hasRole(Roles.ADMIN)){
                this.router.navigate(['/']);
                return false;
            }
            return true;
        }))
    }
}