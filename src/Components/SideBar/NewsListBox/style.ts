import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 400px;
  background-color: white;
  display: flex;
  border-right: 2px solid rgba(222, 226, 230, 1);
  flex-direction: column;
  align-items: center;
`;

export const BigTitleText = styled.div`
  width: 100%;
  height: 70px;
  font-size: 25px;
  font-weight: 700;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(222, 226, 230, 1);
  padding-left: 30px;
`;

export const CloseBtn = styled.div`
  position: absolute;
  left: 392px;
  top: 45%;
  width: 40px;
  height: 100px;
  border-radius: 12px;
  border: 2px solid #dee2e6;
  background: #fff;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 8px;
  z-index: -1;
  cursor: pointer;
`;

export const NewsContainer = styled.div`
  width: 100%;
  height: 93vh;
  overflow: scroll;
  background: #f8f8f8;
  border-bottom: 1px solid rgba(222, 226, 230, 1);
`;

export const NewsWrapper = styled.div`
  width: 100%;
  background: #f8f8f8;
  border-bottom: 1px solid rgba(222, 226, 230, 1);
  padding: 25px;
`;

export const NewsTitle = styled.div`
  color: #303030;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const NewsDate = styled.div`
  color: #989898;
  font-size: 13px;
`;

export const Tag = styled.div<{ color: string }>`
  width: 70px;
  padding: 2px 0 3.5px 0;
  margin: 5px 0 0 273px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 11px;
  border-radius: 20px;
  background: ${({ color }) => color};
`;
