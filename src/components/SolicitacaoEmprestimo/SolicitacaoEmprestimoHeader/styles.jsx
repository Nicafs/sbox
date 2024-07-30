import React from 'react';

import Avatar from 'components/MaterialUI/Avatar';
import styled, { css } from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Button from '../../MaterialUI/Button';

export const ButtonStyled = styled(Button)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 14px;
  }

  ${({ theme }) => theme.breakpoints.only('xs')} {
    font-size: 12px;
  }
`;

export const Container = styled(Grid)`
  background: ${({ theme }) => theme.palette.primary.main};
  padding: 10px;
`;

export const Logo = styled.img`
  width: 48px;
`;

export const NomeCliente = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.breakpoints.down('sm')}
    ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 14px;
  }
`;

// eslint-disable-next-line no-unused-vars
export const Titulo = styled(({ contrastText, children, ...others }) => (
  <p {...others}>{children}</p>
))`
  font-size: 18px;
  margin: 0;
  color: ${({ theme }) => theme.palette.common.black};

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 22px;
    text-align: center;
  }
  ${({ contrastText }) =>
    contrastText &&
    css`
      color: ${({ theme }) => theme.palette.primary.contrastText};
    `}
`;

export const AvatarStyled = styled(Avatar)`
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.palette.primary.selected};
`;

export const HeaderGridContainerStyled = styled(Grid)`
  box-shadow: 2px 2px 10px #0000001f;
  position: relative;
`;

export const HeaderGridStyled = styled(Grid)`
  padding: ${({ theme }) => theme.spacing(2)}px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  max-height: fit-content;
`;

export const ValorTotalStyled = styled(Typography)`
  opacity: 0.8;
  font-size: 15px;
  // ${({ theme }) => theme.breakpoints.only('xs')} {
  //   font-size: 8px;
  // }
  color: #2b2b2b;
`;

export const ValorStyled = styled(Typography)`
  font-size: 28px;
  font-weight: 500;
  color: #313331;

  ${({ theme }) => theme.breakpoints.only('sm')} {
    font-size: 16px;
  }
`;

export const DivLogo = styled.div`
  width: 100px;
  display: block;
  ${({ theme }) => theme.breakpoints.only('xs')} {
    width: 60px;
  }
`;

export const LogoStyled = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

export const BotaoSairStyled = styled(Typography)`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.secondary.main};
  // ${({ theme }) => theme.breakpoints.only('xs')} {
  //   font-size: 8px;
  // }
  margin-bottom: 4px;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
`;

export const GridStepperStyled = styled(Grid)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-top: 48px;
  }
`;
