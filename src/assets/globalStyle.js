import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-size: 1.025em;
    font-family: "Noto Sans";
  }

  *::-webkit-scrollbar {
    width: 0.5em;
  }

  *::-webkit-scrollbar-track {
    background-color: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
  }

  @font-face {
    font-family: "Noto Sans";
    src: url("./fonts/NotoSans.ttf");
  }
`;

export default GlobalStyle;
