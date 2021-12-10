import { Observable } from "rxjs";
import { HttpService } from "./http.service";

export class ArticlesApi {
    private readonly apiController: string = 'articles';
    constructor(private api: HttpService){}

    list(): Observable<any[]>{
        return this.api.get(this.apiController);
    }

    add(data:any): Observable<any> {
        return this.api.post(this.apiController,data);
    }

    update(data:any): Observable<any> {
        return this.api.put(this.apiController,data);
    }

    get(searchName: string): Observable<any>  {
        return this.api.get(`${this.apiController}/${searchName}`)
    }

    getLatest(): Observable<any>  {
        return this.api.get(`${this.apiController}/latest`);
    }

    delete(id:string):Observable<any>{
        return this.api.delete(`${this.apiController}/${id}`);
    }
}