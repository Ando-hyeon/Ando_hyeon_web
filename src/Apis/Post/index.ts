import { MutationOptions, useMutation } from "react-query";
import { instance } from "../axios";
import { PostType } from "./request";
import { PostListResponse } from "./response";

const router = "/post";

export const getPostList = async (region: string, type: PostType) => {
  const { data } = await instance.get<Promise<PostListResponse>>(
    `${router}/list?region=${region}&size=${30}&type=${type}`
  );
  return data;
};

export const getMyPostList = async () => {
  const { data } = await instance.get<Promise<PostListResponse>>(
    `${router}/me`
  );
  return data;
};

export const useCreatePost = (
  postData: {
    title: string;
    content: string;
  },
  address: {
    detailAddress: string;
    lat: number;
    long: number;
  },
  options: MutationOptions
) => {
  const data = {
    title: postData.title,
    content: postData.content,
    address: {
      detailAddress: address.detailAddress,
      lat: address.lat,
      long: address.long,
    },
  };
  return useMutation(async () => instance.post(`${router}`, data), {
    ...options,
  });
};

export const useEditPost = (
  title: string,
  postData: {
    title: string;
    content: string;
  },
  options: MutationOptions
) => {
  return useMutation(async () => instance.patch(`${router}?title=${title}`, postData), {
    ...options,
  });
};

export const useDeletePost = (title: string, options: MutationOptions) => {
  return useMutation(async () => instance.delete(`${router}?title=${title}`), {
    ...options,
  });
};
