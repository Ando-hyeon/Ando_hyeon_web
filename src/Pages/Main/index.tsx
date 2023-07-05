import { useEffect, useState } from "react";
import {
  PostQueryStringType,
  PostTextsType,
  ViewSideBarType,
} from "../../Apis/Post/request";
import { PostListType } from "../../Apis/Post/response";
import { Main } from "../../Components/Main";
import { NavigationBar } from "../../Components/NavigationBar";
import { useGetPostList } from "../../Hooks/PostList";
import * as _ from "./style";

export function MainPage() {
  const [viewSideBar, setViewSideBar] = useState<ViewSideBarType>("");
  const [postQueryString, setPostQueryString] = useState<PostQueryStringType>({
    detailAddress: "대전광역시 유성구",
    postType: "USER",
  });

  const [postTexts, setPostTexts] = useState<PostTextsType>({
    address: "",
    title: "",
    content: "",
    email: "",
    name: "",
    statement: "",
  });

  const { data: post, refetch: refetchPost } = useGetPostList(
    postQueryString.detailAddress,
    postQueryString.postType
  );

  const [userList, setUserList] = useState<PostListType[]>([]);

  const [newsList, setNewsList] = useState<PostListType[]>([]);

  useEffect(() => {
    if (post?.response[0].postType === "USER") {
      setUserList(post.response);
    } else if (post?.response[0].postType === "NEWS") {
      setNewsList(post.response);
    }
  }, [post]);

  return (
    <>
      <NavigationBar
        newsList={newsList}
        postTexts={postTexts}
        setPostTexts={setPostTexts}
        setPostQueryString={setPostQueryString}
        refetchPost={refetchPost}
        viewSideBar={viewSideBar}
        setViewSideBar={setViewSideBar}
      />
      <Main
        userList={userList}
        setPostTexts={setPostTexts}
        setViewSideBar={setViewSideBar}
      />
    </>
  );
}
