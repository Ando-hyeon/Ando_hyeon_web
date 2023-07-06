import { useQuery } from "react-query";
import { getMyPostList } from "../Apis/Post";
import { Cookies } from "react-cookie";

/** 마커들을 불러오는 api입니다. */
export function useGetMyPostList() {
  const cookies = new Cookies();
  return useQuery(["getMyPostList"], () => getMyPostList(), {
    refetchOnWindowFocus: true,
    enabled: cookies.get("accessToken") !== undefined,
  });
}
