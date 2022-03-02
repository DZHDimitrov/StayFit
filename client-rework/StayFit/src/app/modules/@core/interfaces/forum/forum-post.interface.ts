export interface IPostMainCategoryRes {
    postMainCategories: IPostMainCategory[];
  }
  
  interface IPostMainCategory {
    name: string;
    postSubCategories: IPostSubCategory[];
  }
  
  interface IPostSubCategory {
    id: number;
    name: string;
  }
  
  export interface IPostPreviewRes {
    count: number;
    itemsPerPage: number;
    page: number;
    pages: number;
    postPreviews: IPostPreview[];
  }
  
  interface IPostPreview {
    author: string;
    lastCommentUsername: string;
    timePassed: number;
    title: string;
  }
  
  export interface IPostRes {
    post: IPost;
  }
  
  interface IPost {
    author: string;
    content: string;
    createdOn: string;
    id: number;
    modifiedOn: string;
  }
  
  export interface ICreatePostRes {
    postId: number;
    title: string;
  }
  
  export interface IUpdatePostRes {
    postId: number;
    title: string;
    content: string;
  }
  
  export interface IDeletePostRes {
    id: number;
  }