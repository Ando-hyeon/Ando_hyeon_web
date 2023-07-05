import * as _ from "./style";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { PostTextsType, ViewSideBarType } from "../../Apis/Post/request";
import { PostListType } from "../../Apis/Post/response";
import BlackMarkerImg from "../../Assets/Svg/BlackMarker.svg";
import BlueMarkerImg from "../../Assets/Svg/BlueMarker.svg";
import Plus from "../../Assets/Svg/Plus.svg";
import DisabledPlus from "../../Assets/Svg/DisabledPlus.svg";
import { CityReviewModal } from "../CityReviewModal";

interface PropsType {
  userList: PostListType[];
  setPostTexts: Dispatch<SetStateAction<PostTextsType>>;
  setViewSideBar: Dispatch<SetStateAction<ViewSideBarType>>;
}

export function Main({ userList, setPostTexts, setViewSideBar }: PropsType) {
  const { kakao } = window;
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  const [location, setLoacation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  }); // 현재 위치를 저장할 상태
  const [address, setAddress] = useState({
    region_1depth_name: "",
    region_2depth_name: "",
  }); // 현재 좌표의 주소를 저장할 상태

  const getAddress = () => {
    const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
    const coord = new kakao.maps.LatLng(location.lat, location.lng); // 주소로 변환할 좌표 입력
    const callback = function (result: any, status: string) {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
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
  };

  const errorHandler = (error: { code: number; message: string }) => {
    console.log(error);
  };

  // console.log(position)
  return (
    <>
      <CityReviewModal />
      <_.Addmarker disabled={position.lat === 0} onClick={() => {}}>
        <img src={position.lat === 0 ? DisabledPlus : Plus} width={50} />
      </_.Addmarker>
      <Map
        center={{ lat: location.lat, lng: location.lng }} // 지도의 중심 좌표
        style={{ width: "100vw", height: "100vh" }} // 지도 크기
        level={3} // 지도 확대 레벨
        onClick={(_t, mouseEvent) =>
          setPosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          })
        }
      >
        {position && (
          <MapMarker
            image={{ src: BlueMarkerImg, size: { width: 60, height: 60 } }}
            position={position}
          />
        )}
        {userList.map((item, i) => {
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
                setViewSideBar("UserDetail");
              }}
            />
          );
        })}
      </Map>
    </>
  );
}
