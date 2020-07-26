/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  color: #312e38;
  font-weight: 600;
  border: none;
  height: 40px;
  border-radius: 4px;
  padding: 0px 12px;
  width: 100%;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${props => shade(0.15, props.theme.colors.secondary)};
  }
`;
