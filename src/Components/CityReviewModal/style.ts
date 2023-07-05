import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  z-index: 102;
  width: 1000px;
  height: 600px;
  border-radius: 20px;
`;

export const Header = styled.div`
  width: 100%;
  height: 100px;
  background-color: black;
  border-radius: 20px 20px 0px 0px;
`;

export const Body = styled.div`
  width: 100%;
  height: 500px;
  background-color: white;
  border-radius: 0px 0px 20px 20px;
`;
