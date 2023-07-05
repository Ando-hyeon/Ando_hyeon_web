import * as _ from "./style";
import BlackMarkerImg from "../../Assets/Svg/BlackMarker.svg";
import News from "../../Assets/Svg/News.svg";
import Thumb from "../../Assets/Svg/Thumb.svg";
import { UserDetailBox } from "../SideBar/UserDetailBox";
import {
  PostQueryStringType,
  PostTextsType,
  ViewSideBarType,
} from "../../Apis/Post/request";
import { Dispatch, SetStateAction } from "react";
import { NewsListBox } from "../SideBar/NewsListBox";
import { PostListType } from "../../Apis/Post/response";

interface PropsType {
  newsList: PostListType[];
  postTexts: PostTextsType;
  setPostTexts: Dispatch<SetStateAction<PostTextsType>>;
  setPostQueryString: Dispatch<SetStateAction<PostQueryStringType>>;
  refetchPost: () => void;
  viewSideBar: ViewSideBarType;
  setViewSideBar: Dispatch<SetStateAction<ViewSideBarType>>;
}

export function NavigationBar({
  newsList,
  postTexts,
  setPostTexts,
  setPostQueryString,
  refetchPost,
  viewSideBar,
  setViewSideBar,
}: PropsType) {
  return (
    <_.Container>
      <_.Wrapper>
        <_.ImgWrapper>
          <_.LogoImg src={BlackMarkerImg} alt="로고입니다." />
        </_.ImgWrapper>
        {viewSideBar && (
          <>
            <_.EvaluationImg
              src={Thumb}
              alt="도시평가 이미지입니다."
              onClick={() => {
                setPostQueryString((strings) => ({
                  ...strings,
                  postType: "USER",
                }));
                refetchPost();
                setViewSideBar("UserDetail");
              }}
            />
            <_.EvaluationImg
              src={News}
              alt="관련뉴스 이미지입니다."
              onClick={() => {
                if (viewSideBar === "UserDetail") {
                  setPostQueryString((strings) => ({
                    ...strings,
                    postType: "NEWS",
                  }));
                  refetchPost();
                  setViewSideBar("NewsList");
                } else if (viewSideBar === "NewsDetail") {
                  setViewSideBar("NewsList");
                }
              }}
            />
          </>
        )}
      </_.Wrapper>
      {viewSideBar === "UserDetail" && (
        <UserDetailBox
          postTexts={postTexts}
          setPostTexts={setPostTexts}
          setViewSideBar={setViewSideBar}
        />
      )}
      {viewSideBar === "NewsList" && (
        <NewsListBox
          newsList={newsList}
          setPostQueryString={setPostQueryString}
          setViewSideBar={setViewSideBar}
        />
      )}
    </_.Container>
  );
}
