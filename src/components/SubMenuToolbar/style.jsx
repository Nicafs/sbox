import React from 'react';

import Toolbar from 'components/MaterialUI/Toolbar';
import Typography from 'components/MaterialUI/Typography';
import styled, { css } from 'styled-components';

// eslint-disable-next-line no-unused-vars
export const TypographyTituloStyled = styled(({ ativo, theme, ...others }) => (
  <Typography {...others} />
))`
  font-size: 18px;
  cursor: pointer;

  ${({ ativo, theme }) =>
    ativo &&
    css`
      font-weight: bold;
      color: ${theme.palette.primary.dark};
    `}
`;

export const ToolbarStyled = styled(Toolbar)`
  background-color: ${({ theme }) => theme.palette.common.white};
  padding: 8px 0px;

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 0px;
  }
`;

export const IndicadorAtivo = styled.div`
  margin-top: 6px;
  margin-left: auto;
  margin-right: auto;
  width: 10px;
  border-bottom-color: ${({ theme }) => theme.palette.primary.dark};
  border-bottom-style: solid;
  border-bottom-width: 2px;
`;
