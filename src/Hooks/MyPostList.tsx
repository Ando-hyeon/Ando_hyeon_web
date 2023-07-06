import { useQuery } from "react-query";
import { getMyPostList } from "../Apis/Post";

/** 마커들을 불러오는 api입니다. */
export function useGetMyPostList() {
  return useQuery(
    ["getMyPostList"],
    () => getMyPostList(),
    {
      refetchOnWindowFocus: true,
    }
  );
}