import { Injectable } from "@angular/core";

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { Observable } from "rxjs";

import {map} from 'rxjs/operators'
import { DiaryService } from "../backend/services/diary.service";

@Injectable({
    providedIn:'root'
})
export class DiaryGuard implements CanActivate {

    constructor(private diaryService:DiaryService,private router:Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.diaryService.isOwner().pipe(
            map(res => {
                if(!res.data){
                    this.router.navigate([''])
                }
                return res.data;
            })
        )
    }
}