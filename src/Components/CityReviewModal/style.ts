import styled from "styled-components";

export const Container = styled.div`
  width: 1000px;
  height: 600px;
  border-radius: 20px;
`;

export const Header = styled.div`
  width: 100%;
  height: 100px;
  background-color: black;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 30px;
`;

export const HeaderSmallTitle = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
`;

export const HeaderBigTitle = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
`;

export const Body = styled.div`
  width: 100%;
  height: 500px;
  background-color: white;
  border-radius: 0px 0px 20px 20px;
  padding: 30px;
  gap: 20px;
`;

export const BodyTitle = styled.div`
  font-size: 15px;
  margin: 10px 0;
`;

export const BodyInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #eeeeee;
  padding: 20px;
  font-size: 14px;
`;

export const BodyTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  border-radius: 4px;
  border: 1px solid #eeeeee;
  padding: 20px;
  resize: none;
  font-size: 14px;
`;

export const BodyContentWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

export const BodySubmitBtn = styled.button`
  width: 150px;
  height: 45px;
  border: none;
  border-radius: 8px;
  background: #303030;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin-left: 790px;
`;
