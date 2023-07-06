import * as _ from "./style";
import Back from "../../../Assets/Svg/Back.svg";
import {
  PostQueryStringType,
  PostTextsType,
  ViewSideBarType,
} from "../../../Apis/Post/request";
import { Dispatch, SetStateAction } from "react";
import { PostListType } from "../../../Apis/Post/response";

interface PropsType {
  newsList: PostListType[];
  setPostQueryString: Dispatch<SetStateAction<PostQueryStringType>>;
  setViewSideBar: Dispatch<SetStateAction<ViewSideBarType>>;
}

export function NewsListBox({
  newsList,
  setPostQueryString,
  setViewSideBar,
}: PropsType) {
  return (
    <_.Container>
      <_.BigTitleText>
        {newsList[0]?.address.detailAddress} 관련 뉴스 📰
      </_.BigTitleText>
      <_.NewsContainer>
        {(newsList || []).map((item, i) => {
          const statementSort = [
            {
              name: "부정적",
              num: item.statementNegative,
            },
            {
              name: "일반적",
              num: item.statementNeutral,
            },
            {
              name: "긍정적",
              num: item.statementPositive,
            },
          ].sort((a, b) => b.num - a.num);

          const statementTagColor = () => {
            if (statementSort[0].name === "긍정적") {
              return "#00ff0a";
            } else if (statementSort[0].name === "부정적") {
              return "#FF0000";
            } else {
              return "#A08484";
            }
          };

          return (
            <a href={item.content} target="_blank" key={i}>
              <_.NewsWrapper>
                <_.NewsTitle
                  dangerouslySetInnerHTML={{ __html: item.title }}
                ></_.NewsTitle>
                <_.NewsDate
                  dangerouslySetInnerHTML={{ __html: item.shortContent }}
                ></_.NewsDate>
                <_.Tag color={statementTagColor()}>
                  {statementSort[0].name}
                </_.Tag>
              </_.NewsWrapper>
            </a>
          );
        })}
      </_.NewsContainer>
      <_.CloseBtn
        onClick={() => {
          setPostQueryString((strings) => ({
            ...strings,
            postType: "USER",
          }));
          setViewSideBar("");
        }}
      >
        <img src={Back} width={30} />
      </_.CloseBtn>
    </_.Container>
  );
}
