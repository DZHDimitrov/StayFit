export interface ICommentsRes {
  comments: IComment[];
}

interface IComment {
  id: string;
  auhtor: string;
  content: string;
  createdOn: string;
  dislikes: number;
  likes: number;
  modifiedOn: string;
}

export interface ICreateCommentRes {
    id: string;
    content: string;
}

export interface IDeleteCommentRes {
    id: string;
}

export interface ICommentPreviewRes {
  commentPreviews: ICommentPreview[]
}

interface ICommentPreview {
  id: string;
  postId: number;
  author: string;
  content: string;
  createdOn: string;
}