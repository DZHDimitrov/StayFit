import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IApiResponse } from "../../interfaces/api.response";
import { ICreateReadingRequest } from "../../interfaces/requests/reading.req";
import { ICreateReadingRes, IDeleteReading, IReadingData } from "../../interfaces/responses/readings/readings.res";
import { HttpService } from "./http.service";

@Injectable()
export class ReadingsApi {
    private readonly apiController: string = 'readings';
    constructor(private api: HttpService){}

    listByMainCategory(category:string): Observable<IApiResponse<IReadingData>>{
        return this.api.get(`${this.apiController}/${category}`);
    }

    listBySubCategory(category:string,subcategory:string): Observable<IApiResponse<IReadingData>> {
        return this.api.get(`${this.apiController}/${category}/${subcategory}`)
    }

    loadLatest(category:string):Observable<IApiResponse<IReadingData>> {
        return this.api.get(`${this.apiController}/${category}/latest`)
    }

    loadByIdInSubGroup(category: string,id:number,subCategory?: number): Observable<IApiResponse<IReadingData>> {
        return this.api.get(`${this.apiController}/${category}/single/${id}?subcategory=${subCategory}`)
    }

    add(data:ICreateReadingRequest): Observable<IApiResponse<ICreateReadingRes>> {
        return this.api.post(this.apiController,data);
    }

    update(data:any): Observable<any> {
        return this.api.put(this.apiController,data);
    }

    delete(id:number):Observable<IApiResponse<IDeleteReading>> {
        return this.api.delete(`${this.apiController}/${id}`);
    }
}