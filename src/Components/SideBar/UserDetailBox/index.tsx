import * as _ from "./style";
import Back from "../../../Assets/Svg/Back.svg";
import { PostTextsType, ViewSideBarType } from "../../../Apis/Post/request";
import { Dispatch, SetStateAction } from "react";

interface PropsType {
  postTexts: PostTextsType;
  setPostTexts: Dispatch<SetStateAction<PostTextsType>>;
  setViewSideBar: Dispatch<SetStateAction<ViewSideBarType>>;
}

export function UserDetailBox({
  postTexts,
  setPostTexts,
  setViewSideBar,
}: PropsType) {
  const statementTagColor = () => {
    if (postTexts.statement === "긍정적") {
      return "#00ff0a";
    } else if (postTexts.statement === "부정적") {
      return "#FF0000";
    } else {
      return "#A08484";
    }
  };
  return (
    <_.Container>
      <_.BigTitleText>{postTexts.address} 평가 ✍️</_.BigTitleText>
      <_.ContentWrapper>
        <_.SmallTitleText>{postTexts.title}</_.SmallTitleText>
        <_.TagWrapper>
          <_.Tag color={statementTagColor()}>{postTexts.statement}</_.Tag>
          <_.Writter>작성자 이름: {postTexts.name}</_.Writter>
        </_.TagWrapper>
        <_.Line />
        <_.Content>{postTexts.content}</_.Content>
        <_.EditAndDeleteWrapper>
          {/* <_.EditAndDelete>수정하기</_.EditAndDelete>
          <div>|</div>
          <_.EditAndDelete>삭제하기</_.EditAndDelete> */}
        </_.EditAndDeleteWrapper>
      </_.ContentWrapper>
      <_.CloseBtn
        onClick={() => {
          setPostTexts({
            address: "",
            title: "",
            content: "",
            email: "",
            name: "",
            statement: "",
          });
          setViewSideBar("");
        }}
      >
        <img src={Back} width={30} />
      </_.CloseBtn>
    </_.Container>
  );
}
