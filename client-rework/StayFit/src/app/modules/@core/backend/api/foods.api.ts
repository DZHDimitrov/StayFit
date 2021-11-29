import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IAddFoodRes, IFoodCategoryRes } from "../../interfaces/responses/foods/foods.res";
import { HttpService } from "./http.service";

@Injectable()
export class FoodsApi {
    private readonly apiController = 'foods';

    constructor(private api:HttpService){}

    listCategories():Observable<IFoodCategoryRes> {
        return this.api.get(this.apiController);
    }

    add(data:any):Observable<IAddFoodRes>{
        return this.api.post(`${this.apiController}`,data)
    }

    getNutrients():Observable<any> {
        return this.api.get(`${this.apiController}/nutrients`);
    }
}