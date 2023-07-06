import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  z-index: 100;
  position: fixed;
`;

export const Wrapper = styled.div`
  height: 100vh;
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-right: 2px solid rgba(222, 226, 230, 1);
`;

export const LogoImg = styled.img`
  width: 40px;
`;

export const ImgWrapper = styled.div`
  height: 120px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid rgba(222, 226, 230, 1);
`;

export const EvaluationImg = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 25px;
`;

export const SignWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SignText = styled.div`
  font-size: 13px;
  cursor: pointer;
`;

export const Line = styled.div`
  width: 80%;
  margin: 20px 0;
  border: 0.5px solid rgba(222, 226, 230, 1);
`;
