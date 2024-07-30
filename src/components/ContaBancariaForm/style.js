import styled from 'styled-components';

import { Grid } from '@material-ui/core';

import Button from '../MaterialUI/Button';
import Typography from '../MaterialUI/Typography';

export const FormItemTitleStyled = styled(Typography)`
  font-size: 14px;
  line-height: 1.5;
  color: #7f8fa4;
`;

export const FormItemTitleTipoContaStyled = styled(FormItemTitleStyled)`
  margin-bottom: 16px;
`;

export const ButtonStyled = styled(Button)`
  ${({ ativo, theme }) =>
    ativo === 'true' &&
    `color: ${theme.palette.primary.main};
     border-color: ${theme.palette.primary.main};`}
`;

export const ContainerStyled = styled.div`
  padding: 30px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 0 15px;
  }
`;

export const Titulo = styled.h1`
  font-size: 32px;
  color: ${({ theme }) => theme.palette.primary.dark};
  font-weight: normal;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-top: 0px;
  }
`;

export const SubTitulo = styled.p`
  color: ${({ theme }) => theme.palette.common.black};
`;

export const GridContainerTipoConta = styled(Grid)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    display: flex;
  }
`;
