import * as _ from "./style";
import Back from "../../../Assets/Svg/Back.svg";
import {
  PostQueryStringType,
  PostTextsType,
  ViewSideBarType,
} from "../../../Apis/Post/request";
import { Dispatch, SetStateAction, useState } from "react";
import { Cookies } from "react-cookie";
import { useDeletePost, useEditPost } from "../../../Apis/Post";
import { useForm } from "../../../Hooks/useForm";

interface PropsType {
  setPostQueryString: Dispatch<SetStateAction<PostQueryStringType>>;
  postTexts: PostTextsType;
  setViewSideBar: Dispatch<SetStateAction<ViewSideBarType>>;
  refetchMyPost: () => void;
  newData: () => void;
}

export function UserDetailBox({
  setPostQueryString,
  postTexts,
  setViewSideBar,
  refetchMyPost,
  newData,
}: PropsType) {
  const cookies = new Cookies();
  const statementTagColor = () => {
    if (postTexts.statement === "긍정적") {
      return "#00ff0a";
    } else if (postTexts.statement === "부정적") {
      return "#FF0000";
    } else {
      return "#A08484";
    }
  };

  const { form: postData, handleChange } = useForm({
    title: postTexts.title,
    content: postTexts.content,
  });

  const { title, content } = postData;

  const [canEdit, setCanEdit] = useState<boolean>(false);

  const { mutate: handleEditPost } = useEditPost(postTexts.title, postData, {
    onSuccess: () => {
      alert("평가 수정에 성공했습니다.");
      setPostQueryString((strings) => ({
        ...strings,
        postType: "USER",
      }));
      setTimeout(() => {
        refetchMyPost();
        newData();
      });
      setCanEdit(false);
      setViewSideBar("");
    },
    onError: () => {
      alert("평가 수정에 실패했습니다.");
    },
  });

  const { mutate: handleDeletePost } = useDeletePost(postTexts.title, {
    onSuccess: () => {
      alert("평가 삭제에 성공했습니다.");
      setViewSideBar("");
      setPostQueryString((strings) => ({
        ...strings,
        postType: "USER",
      }));
      setTimeout(() => {
        refetchMyPost();
        newData();
      });
    },
    onError: () => {
      alert("평가 삭제에 실패했습니다.");
    },
  });

  return (
    <_.Container>
      <_.BigTitleText>{postTexts.address} 평가 ✍️</_.BigTitleText>
      <_.ContentWrapper>
        {canEdit ? (
          <_.EditInput
            type="text"
            placeholder="제목을 입력해주세요!"
            onChange={handleChange}
            name="title"
            value={title}
          />
        ) : (
          <_.SmallTitleText>{postTexts.title}</_.SmallTitleText>
        )}
        <_.TagWrapper>
          {canEdit ? (
            <div />
          ) : (
            <_.Tag color={statementTagColor()}>{postTexts.statement}</_.Tag>
          )}
          <_.Writter>작성자 이름: {postTexts.name}</_.Writter>
        </_.TagWrapper>
        <_.Line />
        {canEdit ? (
          <>
            <_.EditTextarea
              placeholder="내용을 작성해주세요!"
              onChange={handleChange}
              name="content"
              value={content}
            />
            <_.BtnWrapper>
              <_.CancelBtn onClick={() => setCanEdit(false)}>취소</_.CancelBtn>
              <_.EditBtn onClick={() => handleEditPost()}>수정</_.EditBtn>
            </_.BtnWrapper>
          </>
        ) : (
          <_.Content>{postTexts.content}</_.Content>
        )}
        {cookies.get("email") === postTexts.email && !canEdit && (
          <_.EditAndDeleteWrapper>
            <_.EditAndDelete onClick={() => setCanEdit(true)}>
              수정하기
            </_.EditAndDelete>
            <div>|</div>
            <_.EditAndDelete onClick={() => handleDeletePost()}>
              삭제하기
            </_.EditAndDelete>
          </_.EditAndDeleteWrapper>
        )}
      </_.ContentWrapper>
      <_.CloseBtn
        onClick={() => {
          setViewSideBar("");
        }}
      >
        <img src={Back} width={30} />
      </_.CloseBtn>
    </_.Container>
  );
}
