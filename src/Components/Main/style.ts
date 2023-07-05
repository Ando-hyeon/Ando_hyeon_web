import styled from "styled-components";

export const Addmarker = styled.button<{ disabled: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 50px;
  bottom: 50px;
  width: 70px;
  height: 70px;
  color: black;
  font-size: 60px;
  background-color: white;
  border: 2px solid ${({ disabled }) => (disabled ? "#C2D3FF" : "#5585FF")};
  border-radius: 50%;
  z-index: 101;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
