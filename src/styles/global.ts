/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body{
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiazed;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  input:-webkit-autofill {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.text} !important;
    -webkit-box-shadow: 0 0 0px 10000px ${({ theme }) =>
      theme.colors.input} inset;
  }





  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

`;
