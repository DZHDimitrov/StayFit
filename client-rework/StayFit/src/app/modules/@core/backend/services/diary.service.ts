import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { INote, INoteRequest } from 'src/app/modules/@pages/diary/models/diary.model';

import { IApiResponse } from '../../interfaces/api.response';

import { DiaryApi } from '../api/diary.api';

@Injectable()
export class DiaryService {
  constructor(private api: DiaryApi) {}

  createDiary(data?: any): Observable<IApiResponse<string>> {
    return this.api.createDiary(data);
  }

  loadNotes(year: string, month: string): Observable<IApiResponse<INote[]>> {
    return this.api.loadNotes(year, month);
  }

  loadNoteById(noteId: number, take?: string): Observable<IApiResponse<INote>> {
    return this.api.loadNoteById(noteId, take);
  }

  createNote(date: string, data: INoteRequest): Observable<IApiResponse<string>> {
    return this.api.createNote(date, data);
  }

  editNote(noteId: number, data: INoteRequest): Observable<IApiResponse<string>> {
    return this.api.editNote(noteId, data);
  }

  isOwner():Observable<IApiResponse<boolean>> {
    return this.api.isOwner();
  }
}
