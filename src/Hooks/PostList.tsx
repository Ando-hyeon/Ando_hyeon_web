import { useQuery } from "react-query";
import { getPostList } from "../Apis/Post";
import { PostType } from "../Apis/Post/request";

/** 마커들을 불러오는 api입니다. */
export function useGetPostList(region: string, type: PostType) {
  return useQuery(
    ["getPostList", region, type],
    () => getPostList(region, type),
    {
      refetchOnWindowFocus: true,
      enabled: region !== "" && type !== null,
    }
  );
}
