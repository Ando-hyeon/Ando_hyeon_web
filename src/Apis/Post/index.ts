import { instance } from "../axios";
import { PostType } from "./request";
import { PostListResponse } from "./response";

const router = "/post";

export const getPostList = async (region: string, type: PostType) => {
  const { data } = await instance.get<Promise<PostListResponse>>(
    `${router}/list?region=${region}&type=${type}`
  );
  return data;
};
