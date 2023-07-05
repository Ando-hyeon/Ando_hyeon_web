import { PostType } from "./request";

export interface PostListResponse {
  response: PostListType[];
}

export interface PostListType {
  title: string;
  content: string;
  shortContent: string;
  writer: {
    email: string;
    name: string;
  };
  postType: PostType;
  statementNeutral: number;
  statementNegative: number;
  statementPositive: number;
  address: {
    detailAddress: string;
    latitude: number;
    longitude: number;
  };
  referenceUrl: string | null;
}
