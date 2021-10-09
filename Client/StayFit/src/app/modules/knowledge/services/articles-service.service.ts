import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiMethod } from 'src/app/core/services/conts';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IRecentArticle } from 'src/app/shared/interfaces/Articles/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpService) { }

  getRecentArticles(): Observable<IRecentArticle[]> {
    return this.http.requestCall('/articles/latest',ApiMethod.GET);
  }

  getAllArticlesOnPage(): Observable<IRecentArticle[]> {
    return this.http.requestCall('/articles',ApiMethod.GET);
  }
}
