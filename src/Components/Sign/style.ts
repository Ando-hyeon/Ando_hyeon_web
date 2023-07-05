import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 500px;
  height: 600px;
  margin-top: -80px;
`;

export const LogoImg = styled.img`
  width: 200px;
  height: 200px;
`;

export const BigTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin: -20px 0 20px 0;
`;

export const SmallTitle = styled.div`
  color: #303030;
  font-size: 14px;
  font-weight: 400;
  margin: 0 0 8px 5px;
`;

export const ContentInput = styled.input`
  width: 400px;
  height: 45px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  padding: 0 40px 0 10px;
`;

export const EyeImg = styled.img`
  position: absolute;
  margin: 10px 0 0 -33px;
`;

export const SubmitBtn = styled.button`
  width: 400px;
  height: 45px;
  font-size: 14px;
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 4px;
  background: #303030;
  margin-top: 20px;
`;

export const SignUpText = styled.div`
  font-size: 14px;
  font-weight: 500;
  padding-top: 20px;
`;
