import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToastProps {
  type?: 'success' | 'info' | 'error';
}

const toastTypesVariants = {
  info: css`
    background: ${({ theme }) => theme.colors.info};
    color: ${({ theme }) => theme.colors.text};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success};
    color: ${({ theme }) => theme.colors.text};
  `,
  error: css`
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.text};
  `,
};

export const Container = styled(animated.div)<ToastProps>`
  width: 360px;
  position: relative;
  padding: 16px 8px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;

  ${({ type }) => toastTypesVariants[type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }
  div {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
  }
  p {
    margin-top: 4px;
    font-size: 14px;
    opacity: 0.8;
    line-height: 20px;
  }
  button {
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
    display: flex;
    align-items: center;
  }
  & + div {
    margin-top: 8px;
  }
`;
