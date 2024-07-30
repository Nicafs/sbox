import styled, { css } from 'styled-components';

export const DivContainerStyled = styled.div`
  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}
`;
