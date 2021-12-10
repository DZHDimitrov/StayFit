import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { fromEvent, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";


@Injectable()
export class AuthActivate implements CanLoad{
    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log(route.loadChildren?.length)
        console.log(segments[1])

        return true;
    }

}