import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Arial', sans-serif;
    padding-top: 60px; /* Adjust according to your header height */
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 20px 0;
  }

  p {
    margin: 10px 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
