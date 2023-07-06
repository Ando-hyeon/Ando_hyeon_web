import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Noto Sans KR";
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: black;
  }

  input, textarea {
    outline: none;
  }

  button {
    cursor: pointer;
  }
`;
