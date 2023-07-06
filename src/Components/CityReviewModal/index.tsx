import { Dispatch, SetStateAction } from "react";
import { useCreatePost } from "../../Apis/Post";
import { PostQueryStringType } from "../../Apis/Post/request";
import { useForm } from "../../Hooks/useForm";
import * as _ from "./style";

interface PropsType {
  address: {
    detailAddress: string;
    lat: number;
    long: number;
  };
  setPostQueryString: Dispatch<SetStateAction<PostQueryStringType>>;
  setViewModal: Dispatch<SetStateAction<boolean>>;
  setPosition: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
  refetchMyPost: () => void;
  newData: () => void;
}

export function CityReviewModal({
  address,
  setViewModal,
  setPosition,
  refetchMyPost,
  newData,
  setPostQueryString,
}: PropsType) {
  const { form: postData, handleChange } = useForm({
    title: "",
    content: "",
  });

  const { title, content } = postData;

  const { mutate: handleCreatePost } = useCreatePost(postData, address, {
    onSuccess: () => {
      alert("평가 등록에 성공했습니다.");
      setViewModal(false);
      setPosition({
        lat: 0,
        lng: 0,
      });
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
      alert("평가 등록에 실패했습니다.");
    },
  });
  return (
    <_.Container>
      <_.Header>
        <_.HeaderSmallTitle>도시 평가를 작성해주세요!</_.HeaderSmallTitle>
        <_.HeaderBigTitle>이곳에서의 평가를 남겨볼까요?</_.HeaderBigTitle>
      </_.Header>
      <_.Body>
        <_.BodyContentWrapper>
          <_.BodyTitle>제목</_.BodyTitle>
          <_.BodyInput
            type="text"
            placeholder="제목을 입력해주세요!"
            onChange={handleChange}
            name="title"
            value={title}
          />
        </_.BodyContentWrapper>
        <_.BodyContentWrapper>
          <_.BodyTitle>내용</_.BodyTitle>
          <_.BodyTextarea
            placeholder="글을 작성해주세요!"
            onChange={handleChange}
            name="content"
            value={content}
          />
        </_.BodyContentWrapper>
        <_.BodySubmitBtn
          onClick={() => {
            handleCreatePost();
          }}
        >
          남기기
        </_.BodySubmitBtn>
      </_.Body>
    </_.Container>
  );
}
