import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IAuthResponseData, IRegisterResponseData } from "../../interfaces/auth/user.interface";
import { HttpService } from "./http.service";

@Injectable({
    providedIn:'root'
})
export class AccountApi {
    private readonly apiController: string = 'account';

    constructor(private api: HttpService) {}

    login(data:FormData): Observable<IAuthResponseData> {
        return this.api.post(`${this.apiController}/login`,data);
    }

    register(data: any): Observable<IRegisterResponseData> {
        return this.api.post(`${this.apiController}/register`,data);
    }
}