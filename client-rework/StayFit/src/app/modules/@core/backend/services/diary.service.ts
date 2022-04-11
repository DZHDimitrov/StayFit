import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IApiResponse } from '../../interfaces/api.response';

import { INote } from '../../interfaces/diary/diary.interface';

import { INoteData } from '../../interfaces/diary/post-requests/diary-notes.post';

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

  createNote(date: string, data: INoteData): Observable<IApiResponse<string>> {
    return this.api.createNote(date, data);
  }

  editNote(noteId: number, data: INoteData): Observable<IApiResponse<string>> {
    return this.api.editNote(noteId, data);
  }

  isOwner():Observable<IApiResponse<boolean>> {
    return this.api.isOwner();
  }
}
