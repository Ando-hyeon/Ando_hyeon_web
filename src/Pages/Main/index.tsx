import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import {
  PostQueryStringType,
  PostTextsType,
  ViewSideBarType,
} from "../../Apis/Post/request";
import { PostListType } from "../../Apis/Post/response";
import { Main } from "../../Components/Main";
import { NavigationBar } from "../../Components/NavigationBar";
import { useGetMyPostList } from "../../Hooks/MyPostList";
import { useGetPostList } from "../../Hooks/PostList";
import * as _ from "./style";

export function MainPage() {
  const cookies = new Cookies();
  const [viewSideBar, setViewSideBar] = useState<ViewSideBarType>("");
  const [postQueryString, setPostQueryString] = useState<PostQueryStringType>({
    detailAddress: "",
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

  const { data: myPost, refetch: refetchMyPost } = useGetMyPostList();

  const notFilterAllList = post ? post.response : [];
  const filterAllList = post
    ? post?.response.filter((x) => cookies.get("email") !== x.writer.email)
    : [];
  const filterMyList = myPost ? myPost?.response : [];
  const lists = [...filterAllList, ...filterMyList];

  const [userList, setUserList] = useState<PostListType[]>([]);

  const [newsList, setNewsList] = useState<PostListType[]>([]);

  const newData = () => {
    if (filterAllList[0]?.postType === "USER") {
      setUserList(lists);
    } else if (filterAllList[0]?.postType === "NEWS") {
      setNewsList(notFilterAllList);
    } else {
      setUserList(lists);
    }
  };

  useEffect(() => {
    newData();
  }, [post, myPost]);

  return (
    <>
      <NavigationBar
        newsList={newsList}
        postTexts={postTexts}
        setPostQueryString={setPostQueryString}
        refetchPost={refetchPost}
        viewSideBar={viewSideBar}
        setViewSideBar={setViewSideBar}
        refetchMyPost={refetchMyPost}
        newData={newData}
      />
      <Main
        userList={userList}
        setPostTexts={setPostTexts}
        setViewSideBar={setViewSideBar}
        setPostQueryString={setPostQueryString}
        refetchMyPost={refetchMyPost}
        newData={newData}
      />
    </>
  );
}
