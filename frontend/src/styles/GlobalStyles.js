import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #909090;
  }

  :root {
    --primary-color: #909090;
    --secondary-color: #313131;
    --main-color: #e90074;
    --main-color-hover: #e90074;
  }
`;
