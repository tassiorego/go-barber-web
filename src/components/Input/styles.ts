/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored?: boolean;
}

export const Container = styled.div<ContainerProps>`
  padding: 0px 12px;
  width: 100%;
  background: ${({ theme }) => theme.colors.input};
  border-radius: 5px;
  color: #666360;
  display: flex;
  align-items: center;

  border: 1px solid ${({ theme }) => darken(0.12, theme.colors.background)};

  & + div {
    margin-top: 8px;
  }





  ${props =>
    props.isFilled &&
    css`
      color: ${({ theme }) => theme.colors.secondary};
    `}

    ${props =>
      props.isFocused &&
      css`
        border-color: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.secondary};
      `}

  ${props =>
    props.isErrored &&
    css`
      border-color: ${({ theme }) => theme.colors.danger};
      color: ${({ theme }) => theme.colors.danger};
    `}



  input {
    flex: 1;
    color: ${({ theme }) => theme.colors.text};
    padding: 12px 0px;
    height: 100%;
    background: transparent;
    border: 0;


    &::placeholder {
      color: #666360;
    }
  }

  svg{
    &:not(:last-child) {
      margin-right: 10px;
    }

    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  width: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    color: #fff;
    background: ${({ theme }) => theme.colors.danger};

    &::before {
      border-color: ${({ theme }) => theme.colors.danger} transparent;
    }
  }
`;
