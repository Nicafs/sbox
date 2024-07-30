import { createGlobalStyle } from 'styled-components';

import fonts from './fonts';

const globalStyle = createGlobalStyle`
  ${fonts}

  body {
    font-family: FlexoSoft, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    margin: 0;
  }

  html {
    scroll-behavior: smooth;
  }

`;

export default globalStyle;
