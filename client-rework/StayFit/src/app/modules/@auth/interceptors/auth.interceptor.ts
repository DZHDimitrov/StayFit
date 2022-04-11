// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Store } from "@ngrx/store";
// import { Observable, throwError } from "rxjs";
// import { catchError, exhaustMap, take, tap } from "rxjs/operators";
// import { IAppState } from "src/app/state/app.state";
// import { autoLogout } from "../state/auth.actions";
// import { getToken } from "../state/auth.selector";

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private store: Store<IAppState>) {}
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     return this.store.select(getToken).pipe(
//       take(1),
//       exhaustMap((token) => {
//         if (!token) {
//           return next.handle(req);
//         }
//         let modifiedReq = req.clone({
//           setHeaders: {
//             Authorization: 'Bearer ' + token,
//           },
//         });
//         return next.handle(modifiedReq).pipe(
//           catchError((err) => {
//             if (err instanceof HttpErrorResponse) {
//               if (err.status === 401) {
//                 this.store.dispatch(autoLogout());
//               }
//             }
//             return throwError(err);
//           })
//         );
//       })
//     );
//   }
// }
