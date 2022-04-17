import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { INote, INoteRequest } from 'src/app/modules/@pages/diary/models/diary.model';

import { IApiResponse } from '../../interfaces/api.response';

import { HttpService } from './http.service';

@Injectable()
export class DiaryApi {
  private readonly apiController = 'diary';

  constructor(private api: HttpService) {}

  createDiary(data?: any): Observable<IApiResponse<string>> {
    return this.api.post(`${this.apiController}`, data);
  }

  loadNotes(year: string, month: string): Observable<IApiResponse<INote[]>> {
    return this.api.get(`${this.apiController}/${year}/${month}`);
  }

  loadNoteById(noteId: number, take?: string): Observable<IApiResponse<INote>> {
    let queryString = '';

    if (take) {
      queryString = `?take=${take}`;
    }

    return this.api.get(`${this.apiController}/${noteId}/notes${queryString}`);
  }

  createNote(date: string, data: INoteRequest): Observable<IApiResponse<string>> {
    return this.api.post(`${this.apiController}/${date}/notes`, data);
  }

  editNote(noteId: number, data: INoteRequest): Observable<IApiResponse<string>> {
    return this.api.put(`${this.apiController}/${noteId}/notes`, data);
  }

  isOwner():Observable<IApiResponse<boolean>> {
    return this.api.get(`${this.apiController}/owner`);
  }
}
