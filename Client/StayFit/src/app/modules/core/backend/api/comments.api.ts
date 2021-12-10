import { Observable } from "rxjs";
import { HttpService } from "./http.service";

export class CommentsApi {
    private readonly apiController: string = 'forums/comments';
    constructor(private api: HttpService){}

    add(data:any): Observable<any> {
        return this.api.post(this.apiController,data);
    }

    update(data:any): Observable<any> {
        return this.api.put(this.apiController,data);
    }

    delete(id:string):Observable<any>{
        return this.api.delete(`${this.apiController}/${id}`);
    }

    getByPostId(postId: number) {
        return this.api.get(`${this.apiController}/post?id=${postId}`)
    }

    getChosen() {
        return this.api.get(`${this.apiController}/chosen`);
    }

    getRecent() {
        return this.api.get(`${this.apiController}/recent`);
    }

    getMine() {
        return this.api.get(`${this.apiController}/chosen`);
    }

    getVoteByCommentId(commentId: string) {
        return this.api.get(`${this.apiController}/${commentId}/votes`)
    }

    addVote(commentId: string,data:any){ 
        return this.api.post(`${this.apiController}/${commentId}/votes`,data);
    }

    updateVote(commentId: string,data:any){ 
        return this.api.put(`${this.apiController}/${commentId}/votes`,data);
    }

    deleteVote(commentId: string) {
        return this.api.delete(`${this.apiController}/${commentId}/votes`);
    }

}