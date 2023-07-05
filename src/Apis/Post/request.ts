export type PostType = "NEWS" | "USER";
export type ViewSideBarType = "" | "UserDetail" | "NewsDetail" | "NewsList";

export interface PostTextsType {
  address: string;
  title: string;
  content: string;
  email: string;
  name: string;
  statement: string;
}

export interface PostQueryStringType {
  detailAddress: string;
  postType: PostType;
}
