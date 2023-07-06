import * as _ from "./style";
import BlackMarkerImg from "../../Assets/Svg/BlackMarker.svg";
import News from "../../Assets/Svg/News.svg";
import Thumb from "../../Assets/Svg/Thumb.svg";
import LogOut from "../../Assets/Svg/LogOut.svg";
import { UserDetailBox } from "../SideBar/UserDetailBox";
import {
  PostQueryStringType,
  PostTextsType,
  ViewSideBarType,
} from "../../Apis/Post/request";
import { Dispatch, SetStateAction } from "react";
import { NewsListBox } from "../SideBar/NewsListBox";
import { PostListType } from "../../Apis/Post/response";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

interface PropsType {
  newsList: PostListType[];
  postTexts: PostTextsType;
  setPostQueryString: Dispatch<SetStateAction<PostQueryStringType>>;
  refetchPost: () => void;
  viewSideBar: ViewSideBarType;
  setViewSideBar: Dispatch<SetStateAction<ViewSideBarType>>;
  refetchMyPost: () => void;
  newData: () => void;
}

export function NavigationBar({
  newsList,
  postTexts,
  setPostQueryString,
  refetchPost,
  viewSideBar,
  setViewSideBar,
  refetchMyPost,
  newData,
}: PropsType) {
  const cookies = new Cookies();
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
                setPostQueryString((strings) => ({
                  ...strings,
                  postType: "NEWS",
                }));
                setTimeout(() => refetchPost());
                setViewSideBar("NewsList");
              }}
            />
          </>
        )}
        {!cookies.get("accessToken") ? (
          <_.SignWrapper>
            <_.Line />
            <Link to="/signIn">
              <_.SignText>로그인</_.SignText>
            </Link>
            <_.Line />
            <Link to="signUp">
              <_.SignText>회원가입</_.SignText>
            </Link>
          </_.SignWrapper>
        ) : (
          <_.SignWrapper
            onClick={() => {
              cookies.remove("accessToken");
              cookies.remove("email");
            }}
          >
            <img src={LogOut} alt="로그아웃입니다." />
          </_.SignWrapper>
        )}
      </_.Wrapper>
      {viewSideBar === "UserDetail" && (
        <UserDetailBox
          setPostQueryString={setPostQueryString}
          postTexts={postTexts}
          setViewSideBar={setViewSideBar}
          refetchMyPost={refetchMyPost}
          newData={newData}
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
