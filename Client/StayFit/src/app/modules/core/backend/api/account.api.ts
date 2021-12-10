import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "./http.service";

@Injectable({
    providedIn:'root'
})
export class AccountApi {
    private readonly apiController: string = 'account';

    constructor(private api: HttpService) {}

    login(data:FormData): Observable<any> {
        return this.api.post(`${this.apiController}/login`,data);
    }

    register(data: any): Observable<any> {
        return this.api.post(`${this.apiController}/register`,data);
    }
}