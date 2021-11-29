import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class VotesApi {
  private readonly apiController: string = 'forums/comments';

  constructor(private api: HttpService) {}

  listByCommentId(commentId: string): Observable<any> {
    return this.api.get(`${this.apiController}/${commentId}/votes`);
  }

  add(commentId: string, data: any): Observable<any> {
    return this.api.post(`${this.apiController}/${commentId}/votes`, data);
  }

  update(commentId: string, data: any): Observable<any> {
    return this.api.put(`${this.apiController}/${commentId}/votes`, data);
  }

  delete(commentId: string): Observable<any> {
    return this.api.delete(`${this.apiController}/${commentId}/votes`);
  }
}
