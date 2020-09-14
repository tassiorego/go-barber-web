/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  min-height: 100vh;

  > header {
    height: 144px;
    background: #28262e;
    width: 100%;

    display: flex;
    align-items: center;

    div {
      max-width: 1120px;
      width: 100%;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  place-content: center;
  width: 100%;
  max-width: 700px;
  margin: -150px auto 0;

  form {
    display: flex;
    flex-direction: column;
    margin: 50px 0px;
    width: 95%;
    max-width: 340px;
    text-align: center;

    h1 {
      font-size: 20px;
      margin-bottom: 18px;
      text-align: left;
    }

    p {
      font-size: 12px;
      margin-top: 14px;
    }
  }

  > a {
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    svg {
      margin-right: 10px;
    }

    &:hover {
      color: ${({ theme }) => shade(0.2, theme.colors.primary)};
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  input[type='file'] {
    display: none;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border-radius: 50%;
    cursor: pointer;
    right: 0;
    bottom: 0;
    border: 0;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
