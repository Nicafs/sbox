// import { green } from 'components/MaterialUI/Colors';
import Grid from 'components/MaterialUI/Grid';
import Typography from 'components/MaterialUI/Typography';
import styled, { css } from 'styled-components';

export const BotaoDeAcao = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.common.white};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;

  ${({ botaoDisabled }) =>
    botaoDisabled &&
    css`
      background: #bdbdbd;
    `}
`;

export const GridContainerStyled = styled(Grid)`
  background: ${({ theme }) => theme.palette.common.white};
`;

export const TypographyValorStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.common.black};
  font-weight: bold;
  font-size: 20px;
`;

export const TypographyQtdStyled = styled(Typography)`
  color: ${({ theme }) => theme.palette.common.black};
  font-size: 14px;
`;
