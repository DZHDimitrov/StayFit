import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../interfaces/api.response';
import { IAddVoteRes, IModifyVoteRes } from '../../interfaces/responses/forum/votes.res';
import { VotesApi } from '../api/votes.api';

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  constructor(private api: VotesApi) { }

  listByCommentId(commentId: string): Observable<any> {
    return this.api.listByCommentId(commentId);
  }

  add(commentId: string, data: any): Observable<IApiResponse<IAddVoteRes>> {
    return this.api.add(commentId,data);
  }

  update(commentId: string, data: any): Observable<IApiResponse<IModifyVoteRes>> {
    return this.api.update(commentId,data);
  }

  delete(commentId: string): Observable<IApiResponse<IModifyVoteRes>> {
    return this.api.delete(commentId);
  }
}
