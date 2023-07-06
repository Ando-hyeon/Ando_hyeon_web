import * as _ from "./style";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import {
  PostQueryStringType,
  PostTextsType,
  ViewSideBarType,
} from "../../Apis/Post/request";
import { PostListType } from "../../Apis/Post/response";
import BlackMarkerImg from "../../Assets/Svg/BlackMarker.svg";
import BlueMarkerImg from "../../Assets/Svg/BlueMarker.svg";
import Plus from "../../Assets/Svg/Plus.svg";
import OutsideClickHandler from "react-outside-click-handler";
import DisabledPlus from "../../Assets/Svg/DisabledPlus.svg";
import { CityReviewModal } from "../CityReviewModal";
import { Cookies } from "react-cookie";

interface PropsType {
  userList: PostListType[];
  setPostTexts: Dispatch<SetStateAction<PostTextsType>>;
  setViewSideBar: Dispatch<SetStateAction<ViewSideBarType>>;
  setPostQueryString: Dispatch<SetStateAction<PostQueryStringType>>;
  refetchMyPost: () => void;
  newData: () => void;
}

export function Main({
  userList,
  setPostTexts,
  setViewSideBar,
  setPostQueryString,
  refetchMyPost,
  newData,
}: PropsType) {
  const cookies = new Cookies();
  const { kakao } = window;
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  const [location, setLoacation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  }); // 현재 위치를 저장할 상태
  const [address, setAddress] = useState<string>(""); // 현재 좌표의 주소를 저장할 상태

  const getAddress = () => {
    const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
    const coord = new kakao.maps.LatLng(position.lat, position.lng); // 주소로 변환할 좌표 입력
    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result) => {
      setTimeout(() =>
        setAddress(
          `${result[0].address.region_1depth_name} ${result[0].address.region_2depth_name}`
        )
      );
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
  }, []);

  const successHandler = (response: {
    coords: { latitude: number; longitude: number };
  }) => {
    // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setLoacation({ lat: latitude, lng: longitude });
    const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
    const coord = new kakao.maps.LatLng(latitude, longitude); // 주소로 변환할 좌표 입력
    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result) => {
      setTimeout(() =>
        setPostQueryString({
          detailAddress: `${result[0].address.region_1depth_name} ${result[0].address.region_2depth_name}`,
          postType: "USER",
        })
      );
    });
  };

  const errorHandler = (error: { code: number; message: string }) => {
    console.log(error);
  };

  return (
    <>
      {viewModal && (
        <_.Background>
          <OutsideClickHandler
            onOutsideClick={() => {
              setViewModal(false);
            }}
          >
            <CityReviewModal
              setPosition={setPosition}
              setViewModal={setViewModal}
              address={{
                detailAddress: address,
                lat: position.lat,
                long: position.lng,
              }}
              setPostQueryString={setPostQueryString}
              refetchMyPost={refetchMyPost}
              newData={newData}
            />
          </OutsideClickHandler>
        </_.Background>
      )}
      <_.Addmarker
        disabled={position.lat === 0 || cookies.get("email") === undefined}
        onClick={() => {
          setViewModal(true);
          setTimeout(() => {
            getAddress();
          });
        }}
      >
        <img
          src={
            position.lat === 0 || cookies.get("email") === undefined
              ? DisabledPlus
              : Plus
          }
          width={50}
        />
      </_.Addmarker>
      <Map
        center={{ lat: location.lat, lng: location.lng }} // 지도의 중심 좌표
        style={{ width: "100vw", height: "100vh" }} // 지도 크기
        level={3} // 지도 확대 레벨
        onClick={(_t, mouseEvent) => {
          setPosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          });
        }}
      >
        {position && cookies.get("email") !== undefined && (
          <MapMarker
            image={{ src: BlueMarkerImg, size: { width: 60, height: 60 } }}
            position={position}
          />
        )}
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={5} // 클러스터 할 최소 지도 레벨
        >
          {(userList || []).map((item, i) => {
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
            return (
              <MapMarker
                key={i}
                image={{ src: BlackMarkerImg, size: { width: 60, height: 60 } }}
                position={{
                  lat: item.address.latitude,
                  lng: item.address.longitude,
                }}
                onClick={() => {
                  setPostTexts({
                    address: item.address.detailAddress,
                    title: item.title,
                    content: item.content,
                    email: item.writer.email,
                    name: item.writer.name,
                    statement: statementSort[0].name,
                  });
                  setPostQueryString({
                    detailAddress: item.address.detailAddress,
                    postType: "NEWS",
                  });
                  setViewSideBar("UserDetail");
                }}
              />
            );
          })}
        </MarkerClusterer>
      </Map>
    </>
  );
}
