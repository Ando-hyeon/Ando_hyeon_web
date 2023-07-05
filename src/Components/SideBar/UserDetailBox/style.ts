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

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 92%;
`;

export const TagWrapper = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Tag = styled.div<{ color: string }>`
  padding: 2px 20px 3.5px 20px;
  color: #fff;
  font-size: 11px;
  border-radius: 20px;
  background: ${({ color }) => color};
`;

export const Writter = styled.div`
  color: #bababa;
  font-size: 12px;
`;

export const SmallTitleText = styled.div`
  width: 100%;
  height: 70px;
  font-size: 20px;
  font-weight: 700;
  padding-top: 12px;
`;

export const Line = styled.div`
  width: 100%;
  border: 0.5px solid rgba(222, 226, 230, 1);
  margin: 5px 0 10px 0;
`;

export const Content = styled.div`
  width: 100%;
  font-size: 15px;
`;

export const EditAndDeleteWrapper = styled.div`
  display: flex;
  width: 45%;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

export const EditAndDelete = styled.div`
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
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
