import { Injectable } from "@angular/core";

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { Observable } from "rxjs";

import {map} from 'rxjs/operators'

import { AccountService } from "../backend/services/account.service";

@Injectable({
    providedIn:'root'
})
export class DiaryGuard implements CanActivate {

    constructor(private accountService:AccountService,private router:Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.accountService.check('diary').pipe(
            map(res => {
                if(!res.data){
                    this.router.navigate([''])
                }
                return res.data;
            })
        )
    }
}