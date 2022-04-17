import { createHTTPActions } from 'src/app/modules/@core/utility/store-actions.helper';
import { INote, INoteRequest } from '../models/diary.model';

export const [createDiary, createDiarySuccess] =
 createHTTPActions<{}, {diaryId:string}>('[diary] create diary');

export const [loadNotes,loadNotesSuccess] =
 createHTTPActions<{year:string,month:string},{notes:INote[]}>('[diary] load notes');

export const [createNote,createNoteSuccess,createNoteFailure] =
 createHTTPActions<{date:string,data:INoteRequest},{noteId:string,year:string,month:string}>('[diary] add note');

export const [loadNoteById,loadNoteByIdSuccess] =
 createHTTPActions<{noteId:number,withRedirection:boolean,take?:string},{note:INote,withRedirection:boolean}>('[diary] load note by id');

export const [editNote,editNoteSuccess] =
 createHTTPActions<{noteId:number,data:INoteRequest},{createdOn:string}>('[diary] edit note');
