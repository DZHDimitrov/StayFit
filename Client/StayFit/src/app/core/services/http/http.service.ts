import { Injectable } from '@angular/core';
import { ApiMethod } from '../conts';
import {HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  requestCall(endPoint: string, method: ApiMethod,data?: any){
    let response: any;

    switch(method) {
      case ApiMethod.GET:
        response = this.http.get(`${environment.apiURL}${endPoint}`)
        .pipe(catchError((err) => this.handleError(err)));
        break;
      case ApiMethod.POST:
        response = this.http.post(`${environment.apiURL}${endPoint}`,data)
        .pipe(catchError((err) => this.handleError(err)));
        break;

      case ApiMethod.PUT:
        response = this.http.put(`${environment.apiURL}${endPoint}`,data)
        .pipe(catchError((err) => this.handleError(err)));
        break;

      case ApiMethod.DELETE:
        response = this.http.delete(`${environment.apiURL}${endPoint}`)
        .pipe(catchError((err) => this.handleError(err)));
        break;
      default:
        break;
    }
    console.log(response);
    return response;
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent){
      console.error('An error occurred:',error.error.message)
    } else {
      return error.error.message
    }
  }
}
